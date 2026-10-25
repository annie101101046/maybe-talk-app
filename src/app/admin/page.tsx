import { createAdminClient } from '@/lib/supabase/admin'

// Live admin data — don't prerender at build time (no service-role key in CI).
export const dynamic = 'force-dynamic'

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

interface Profile {
  id: string
  full_name: string | null
  created_at: string
  email?: string | null
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/* ------------------------------------------------------------------ */
/*  Data fetching                                                       */
/* ------------------------------------------------------------------ */

async function fetchStats() {
  const supabase = createAdminClient()

  const { data: profiles, error: profilesErr } = await supabase
    .from('profiles')
    .select('id, full_name, created_at')
    .order('created_at', { ascending: false })

  if (profilesErr) console.error('profiles fetch error:', profilesErr)

  // Auth users for email (join via auth.users — admin only)
  const { data: authUsers } = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  })

  const emailMap: Record<string, string> = {}
  if (authUsers?.users) {
    for (const u of authUsers.users) {
      emailMap[u.id] = u.email ?? ''
    }
  }

  const enrichedProfiles: Profile[] = (profiles ?? []).map((p) => ({
    ...(p as Profile),
    email: emailMap[p.id] ?? null,
  }))

  return {
    profiles: enrichedProfiles,
    stats: { totalUsers: enrichedProfiles.length },
  }
}

/* ------------------------------------------------------------------ */
/*  Page component (Server Component)                                   */
/* ------------------------------------------------------------------ */

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const { profiles, stats } = await fetchStats()

  const query = (q ?? '').toLowerCase().trim()
  const filteredProfiles = query
    ? profiles.filter(
        (p) =>
          (p.full_name ?? '').toLowerCase().includes(query) ||
          (p.email ?? '').toLowerCase().includes(query)
      )
    : profiles

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-bold text-[#1E2A5E]">
          管理總覽{' '}
          <span className="text-[#1E2A5E]/30 font-normal text-xl">Admin Overview</span>
        </h2>
        <p className="text-sm text-[#1E2A5E]/40 mt-1">這裡的數字，都是剛剛從資料庫讀出來的。</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-[#F28BAE]/15 shadow-sm p-5">
          <p className="text-xs text-[#1E2A5E]/40 font-medium uppercase tracking-widest mb-1.5">
            總用戶數
            <span className="normal-case font-normal ml-1 text-[#1E2A5E]/25">
              Total Users
            </span>
          </p>
          <p className="text-3xl font-extrabold text-[#1E2A5E]">{stats.totalUsers}</p>
        </div>
      </div>

      <section>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h3 className="text-base font-bold text-[#1E2A5E]">
            用戶列表 <span className="text-[#1E2A5E]/30 font-normal text-sm">Users</span>
          </h3>
          <form method="GET" className="flex items-center gap-2">
            <input
              type="search"
              name="q"
              defaultValue={q ?? ''}
              placeholder="搜尋姓名或 Email…"
              className="px-3 py-2 rounded-xl border border-[#F28BAE]/25 bg-white text-sm text-[#1E2A5E] placeholder-[#1E2A5E]/30 focus:outline-none focus:ring-2 focus:ring-[#F28BAE]/30 w-56"
            />
            <button
              type="submit"
              className="px-3 py-2 rounded-xl bg-[#F28B6E] text-white text-sm font-semibold hover:bg-[#e07a5d] transition-colors"
            >
              搜尋
            </button>
            {q && (
              <a
                href="/admin"
                className="text-xs text-[#1E2A5E]/40 hover:text-[#F28B6E] transition-colors"
              >
                清除
              </a>
            )}
          </form>
        </div>

        <div className="bg-white rounded-2xl border border-[#F28BAE]/15 shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#F28BAE]/10">
                <th className="text-left px-5 py-3 text-[#1E2A5E]/40 font-semibold text-xs uppercase tracking-wider">
                  姓名 / Name
                </th>
                <th className="text-left px-5 py-3 text-[#1E2A5E]/40 font-semibold text-xs uppercase tracking-wider hidden sm:table-cell">
                  Email
                </th>
                <th className="text-left px-4 py-3 text-[#1E2A5E]/40 font-semibold text-xs uppercase tracking-wider">
                  加入日期
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProfiles.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-10 text-[#1E2A5E]/30 text-sm">
                    沒有符合的用戶 · No users found
                  </td>
                </tr>
              ) : (
                filteredProfiles.map((user, idx) => (
                  <tr
                    key={user.id}
                    className={`border-b border-[#F28BAE]/5 hover:bg-[#FFF5F0]/60 transition-colors ${
                      idx % 2 === 0 ? '' : 'bg-[#FFF5F0]/30'
                    }`}
                  >
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-[#1E2A5E]">
                        {user.full_name ?? <span className="text-[#1E2A5E]/30 italic">未設定</span>}
                      </p>
                      <p className="text-xs text-[#1E2A5E]/30 sm:hidden mt-0.5">
                        {user.email ?? '—'}
                      </p>
                    </td>
                    <td className="px-5 py-3.5 text-[#1E2A5E]/60 hidden sm:table-cell">
                      {user.email ?? '—'}
                    </td>
                    <td className="px-4 py-3.5 text-[#1E2A5E]/40 text-xs">
                      {formatDate(user.created_at)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {filteredProfiles.length > 0 && (
            <p className="px-5 py-2.5 text-xs text-[#1E2A5E]/30 border-t border-[#F28BAE]/5">
              顯示 {filteredProfiles.length} / {profiles.length} 位用戶
            </p>
          )}
        </div>
      </section>
    </div>
  )
}

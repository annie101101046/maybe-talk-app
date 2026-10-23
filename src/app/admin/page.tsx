import { createAdminClient } from '@/lib/supabase/admin'

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

interface Profile {
  id: string
  full_name: string | null
  credits: number
  is_paid: boolean
  first_free_used: boolean
  created_at: string
  email?: string | null
}

interface Booking {
  id: string
  user_id: string
  cal_booking_id: string | null
  booking_type: string
  status: string
  created_at: string
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

function StatusPill({
  label,
  variant,
}: {
  label: string
  variant: 'green' | 'coral' | 'yellow' | 'grey'
}) {
  const cls = {
    green: 'bg-[#5BBFB5]/15 text-[#5BBFB5] border-[#5BBFB5]/30',
    coral: 'bg-[#F28B6E]/15 text-[#F28B6E] border-[#F28B6E]/30',
    yellow: 'bg-[#FFB627]/15 text-[#FFB627] border-[#FFB627]/30',
    grey: 'bg-[#1E2A5E]/10 text-[#1E2A5E]/50 border-[#1E2A5E]/15',
  }[variant]
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${cls}`}>
      {label}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  Data fetching                                                       */
/* ------------------------------------------------------------------ */

async function fetchStats() {
  const supabase = createAdminClient()

  // Profiles
  const { data: profiles, error: profilesErr } = await supabase
    .from('profiles')
    .select('id, full_name, credits, is_paid, first_free_used, created_at')
    .order('created_at', { ascending: false })

  if (profilesErr) console.error('profiles fetch error:', profilesErr)

  // Auth users for email (join via auth.users — admin only)
  const { data: authUsers } = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  })

  // Build email map
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

  // Bookings
  const { data: bookings, error: bookingsErr, count: bookingsCount } = await supabase
    .from('bookings')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .limit(20)

  if (bookingsErr) console.error('bookings fetch error:', bookingsErr)

  // Compute stats
  const totalUsers = enrichedProfiles.length
  const freeSessionsUsed = enrichedProfiles.filter((p) => p.first_free_used).length
  const totalBookings = bookingsCount ?? (bookings ?? []).length

  return {
    profiles: enrichedProfiles,
    bookings: (bookings ?? []) as Booking[],
    stats: { totalUsers, freeSessionsUsed, totalBookings },
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
  const { profiles, bookings, stats } = await fetchStats()

  // Filter profiles
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
      {/* Page title */}
      <div>
        <h2 className="text-2xl font-bold text-[#1E2A5E]">
          管理總覽{' '}
          <span className="text-[#1E2A5E]/30 font-normal text-xl">Admin Overview</span>
        </h2>
        <p className="text-sm text-[#1E2A5E]/40 mt-1">所有數據均為即時從資料庫讀取。</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: '總用戶數', labelEn: 'Total Users', value: stats.totalUsers, color: 'text-[#1E2A5E]' },
          { label: '已用免費體驗', labelEn: 'Free Sessions Used', value: stats.freeSessionsUsed, color: 'text-[#F28BAE]' },
          { label: '總預約數', labelEn: 'Total Bookings', value: stats.totalBookings, color: 'text-[#5BBFB5]' },
        ].map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-2xl border border-[#F28BAE]/15 shadow-sm p-5"
          >
            <p className="text-xs text-[#1E2A5E]/40 font-medium uppercase tracking-widest mb-1.5">
              {card.label}
              <span className="normal-case font-normal ml-1 text-[#1E2A5E]/25">
                {card.labelEn}
              </span>
            </p>
            <p className={`text-3xl font-extrabold ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Users table */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h3 className="text-base font-bold text-[#1E2A5E]">
            用戶列表 <span className="text-[#1E2A5E]/30 font-normal text-sm">Users</span>
          </h3>
          {/* Search form (GET so server component can read it) */}
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
                <th className="text-center px-4 py-3 text-[#1E2A5E]/40 font-semibold text-xs uppercase tracking-wider">
                  狀態
                </th>
                <th className="text-center px-4 py-3 text-[#1E2A5E]/40 font-semibold text-xs uppercase tracking-wider">
                  Credits
                </th>
                <th className="text-left px-4 py-3 text-[#1E2A5E]/40 font-semibold text-xs uppercase tracking-wider hidden md:table-cell">
                  加入日期
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProfiles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-[#1E2A5E]/30 text-sm">
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
                    <td className="px-4 py-3.5 text-center">
                      {user.is_paid ? (
                        <StatusPill label="Premium" variant="coral" />
                      ) : (
                        <StatusPill label="Free" variant="grey" />
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-center font-bold text-[#5BBFB5]">
                      {user.is_paid ? user.credits : user.first_free_used ? '✓' : '—'}
                    </td>
                    <td className="px-4 py-3.5 text-[#1E2A5E]/40 text-xs hidden md:table-cell">
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

      {/* Recent bookings */}
      <section>
        <h3 className="text-base font-bold text-[#1E2A5E] mb-4">
          最近預約{' '}
          <span className="text-[#1E2A5E]/30 font-normal text-sm">Recent Bookings</span>
        </h3>
        <div className="bg-white rounded-2xl border border-[#F28BAE]/15 shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#F28BAE]/10">
                <th className="text-left px-5 py-3 text-[#1E2A5E]/40 font-semibold text-xs uppercase tracking-wider">
                  類型
                </th>
                <th className="text-center px-4 py-3 text-[#1E2A5E]/40 font-semibold text-xs uppercase tracking-wider">
                  狀態
                </th>
                <th className="text-left px-4 py-3 text-[#1E2A5E]/40 font-semibold text-xs uppercase tracking-wider hidden sm:table-cell">
                  Cal Booking ID
                </th>
                <th className="text-left px-4 py-3 text-[#1E2A5E]/40 font-semibold text-xs uppercase tracking-wider hidden md:table-cell">
                  日期
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-[#1E2A5E]/30 text-sm">
                    尚無預約紀錄
                  </td>
                </tr>
              ) : (
                bookings.map((booking, idx) => {
                  const typeLabel =
                    booking.booking_type === 'free_intro'
                      ? '免費體驗'
                      : booking.booking_type === 'paid_session'
                      ? '深度聊聊'
                      : booking.booking_type
                  const statusVariant: Record<string, 'green' | 'yellow' | 'grey' | 'coral'> = {
                    confirmed: 'green',
                    pending: 'yellow',
                    completed: 'grey',
                    cancelled: 'coral',
                  }
                  return (
                    <tr
                      key={booking.id}
                      className={`border-b border-[#F28BAE]/5 hover:bg-[#FFF5F0]/60 transition-colors ${
                        idx % 2 === 0 ? '' : 'bg-[#FFF5F0]/30'
                      }`}
                    >
                      <td className="px-5 py-3.5 font-medium text-[#1E2A5E]">{typeLabel}</td>
                      <td className="px-4 py-3.5 text-center">
                        <StatusPill
                          label={booking.status}
                          variant={statusVariant[booking.status] ?? 'grey'}
                        />
                      </td>
                      <td className="px-4 py-3.5 font-mono text-xs text-[#1E2A5E]/40 hidden sm:table-cell truncate max-w-[140px]">
                        {booking.cal_booking_id ?? '—'}
                      </td>
                      <td className="px-4 py-3.5 text-[#1E2A5E]/40 text-xs hidden md:table-cell">
                        {formatDate(booking.created_at)}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

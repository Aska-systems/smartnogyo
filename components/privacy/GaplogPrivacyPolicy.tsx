import type { ReactNode } from 'react'

type Props = {
  updated: string
  supportOrg: string
  supportTel: string
}

function Section({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-lg font-bold text-slate-800 border-l-4 border-green-600 pl-3">
        {n}. {title}
      </h2>
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-6 space-y-2 text-slate-700 leading-relaxed">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export default function GaplogPrivacyPolicy({ updated, supportOrg, supportTel }: Props) {
  const year = new Date().getFullYear()
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <main className="flex-1">
        <article className="max-w-3xl mx-auto px-4 py-12">
          <p className="text-4xl sm:text-5xl font-bold tracking-wide text-green-600">GAPLOG</p>
          <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-slate-900">プライバシーポリシー</h1>
          <p className="mt-2 text-sm text-slate-500">{updated}</p>

          <div className="mt-8 space-y-3 text-slate-700 leading-relaxed">
            <p>
              本アプリ「GAPLOG」は、{supportOrg}（以下「当組合」といいます）が主として運営を行います。本アプリの開発・管理は、当組合から委託を受けた合同会社Aska Intelligence（以下「当社」といいます）が行います。
            </p>
            <p>
              本プライバシーポリシーは、当組合および当社と利用者との間における個人情報の取り扱いを定めるものです。当組合および当社は、本アプリにおいて取得する利用者の個人情報を、個人情報の保護に関する法律その他の関係法令を遵守し、以下のとおり適切に取り扱います。
            </p>
          </div>

          <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 rounded-lg border border-slate-200 bg-white p-5 text-sm">
            <dt className="text-slate-500">運営</dt>
            <dd className="text-slate-800">{supportOrg}</dd>
            <dt className="text-slate-500">開発・管理</dt>
            <dd className="text-slate-800">合同会社Aska Intelligence（{supportOrg}より委託）</dd>
          </dl>

          <Section n="1" title="取得する情報">
            <Bullets
              items={[
                '氏名、電話番号、住所、地区、組合員ID',
                '園地情報（栽培面積・わい化面積、SSタンク容量、所属防除組合 など）',
                '営農記録：農薬防除記録、農薬・肥料在庫表、栽培日誌、りんご生産量調査、GAPチェックリスト、資材の申込、誓約書への同意状況',
                'プッシュ通知を配信するための端末トークン',
                'ログイン・認証に伴う情報、アクセス日時などの利用ログ',
              ]}
            />
          </Section>

          <Section n="2" title="利用目的">
            <Bullets
              items={[
                'GAPに基づく営農記録の作成・管理、農産物信頼システムの運用',
                '資材（農薬・肥料・りんご袋）の申込受付、JAからの連絡・お知らせ配信',
                '本人確認・認証、なりすまし等の防止',
                '本サービスの提供・維持・改善、不具合対応、お問い合わせ対応',
              ]}
            />
          </Section>

          <Section n="3" title="第三者提供・業務委託">
            <p className="text-slate-700 leading-relaxed">
              法令に基づく場合等を除き、ご本人の同意なく第三者に個人情報を提供しません。運営のため以下の外部サービスに取扱いを委託しています（適切に監督し、目的外利用を行わせません）。
            </p>
            <Bullets
              items={[
                'クラウド基盤：Supabase（データは日本／東京リージョンで保管）',
                'ホスティング：Vercel（管理画面）',
                'プッシュ通知：Apple（APNs）／Google（FCM）／Expo',
              ]}
            />
          </Section>

          <Section n="4" title="国外への移転について">
            <p className="text-slate-700 leading-relaxed">
              主要なデータは日本国内で保管しますが、プッシュ通知の配信のため、Apple・Google・Expo が運営する国外を含む基盤に端末トークン等が送信される場合があります。
            </p>
          </Section>

          <Section n="5" title="安全管理措置">
            <p className="text-slate-700 leading-relaxed">
              不正アクセス・紛失・改ざん・漏えい等を防止するため、利用者ごとの認証・権限管理、通信の暗号化等の措置を講じます。
            </p>
          </Section>

          <Section n="6" title="保存期間とアカウントの削除">
            <p className="text-slate-700 leading-relaxed">
              営農記録・GAPチェック等は、農産物の信頼性確保および記録保存の目的のため、必要な期間保存します。アカウントの削除をご希望の場合は、「マイページ」→「アカウント削除を依頼する」から削除依頼を送信してください。当組合が本人確認のうえ対応します。法令や記録保存の必要により、依頼後も一部の情報は必要な範囲で保存を継続する場合があります。
            </p>
          </Section>

          <Section n="7" title="開示・訂正・利用停止等の請求">
            <p className="text-slate-700 leading-relaxed">
              個人情報の開示・訂正・追加・削除・利用停止等のご請求には、下記窓口にて本人確認のうえ法令に従い対応します。
            </p>
          </Section>

          <Section n="8" title="改定">
            <p className="text-slate-700 leading-relaxed">
              本ポリシーは、法令の変更やサービスの改善に伴い改定することがあります。重要な変更は本サービス上でお知らせします。
            </p>
          </Section>

          <Section n="9" title="お問い合わせ窓口">
            <div className="rounded-lg border border-slate-200 bg-white p-5 text-slate-800">
              <p className="font-medium">{supportOrg}</p>
              <p className="mt-1">
                TEL：
                <a href={`tel:${supportTel.replace(/-/g, '')}`} className="text-green-600 hover:underline">
                  {supportTel}
                </a>
              </p>
            </div>
          </Section>

          <p className="mt-12 text-right text-sm text-slate-500">{updated}</p>
        </article>
      </main>

      <footer className="bg-slate-800 text-slate-400 py-6 text-center text-sm">
        &copy; {year} 合同会社Aska Intelligence. All rights reserved.
      </footer>
    </div>
  )
}

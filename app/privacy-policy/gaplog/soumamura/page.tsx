import type { Metadata } from 'next'
import GaplogPrivacyPolicy from '@/components/privacy/GaplogPrivacyPolicy'

const UPDATED = '制定日：2026年10月2日'
const SUPPORT_ORG = '相馬村農業協同組合'
const SUPPORT_TEL = '0172-84-3215'

const TITLE = `プライバシーポリシー｜GAPLOG（${SUPPORT_ORG}）`
const DESCRIPTION = `アプリ「GAPLOG」（${SUPPORT_ORG}）のプライバシーポリシーです。`

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://aska-intelligence.com/smartnogyo/privacy-policy/gaplog/soumamura',
    type: 'article',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary',
    title: TITLE,
    description: DESCRIPTION,
  },
}

export default function Page() {
  return <GaplogPrivacyPolicy updated={UPDATED} supportOrg={SUPPORT_ORG} supportTel={SUPPORT_TEL} />
}

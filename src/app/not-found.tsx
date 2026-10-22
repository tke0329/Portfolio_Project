import Link from "next/link";
export default function NotFound() { return <div className="shell not-found"><span className="eyebrow">404 / LOST PATH</span><h1>길을 잃으셨나요?</h1><p>NPC가 알려드린 길이 아닌 것 같습니다. 홈으로 돌아가 다시 탐색해 보세요.</p><Link className="gold-button" href="/">홈으로 돌아가기 ↗</Link></div>; }

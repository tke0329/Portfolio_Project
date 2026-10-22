import Link from "next/link";
export default function ProjectNotFound() { return <div className="shell not-found"><h1>프로젝트를 찾을 수 없습니다.</h1><p>주소를 확인하거나 프로젝트 목록으로 돌아가 주세요.</p><Link className="gold-button" href="/projects">프로젝트 목록</Link></div>; }

# Issue tracker: GitHub

이 프로젝트의 이슈와 명세는 `tke0329/Portfolio_Project`의 GitHub Issues에서 관리한다.
저장소 안에서 `gh` CLI를 사용한다.

## 기본 작업

- 생성: `gh issue create`
- 조회: `gh issue view <number>`
- 목록: `gh issue list`
- 댓글: `gh issue comment <number>`
- 라벨: `gh issue edit <number> --add-label <label>`
- 완료: `gh issue close <number>`

스킬이 "이슈 트래커에 게시"하라고 하면 GitHub 이슈를 생성한다.
스킬이 "티켓을 가져오라"고 하면 해당 GitHub 이슈의 본문과 댓글을 읽는다.

## Pull requests as a triage surface

**PRs as a request surface: no.**

## 작업 관계

가능하면 GitHub의 하위 이슈와 차단 관계를 사용한다.
저장소에서 해당 기능을 사용할 수 없으면 이슈 본문에 `Part of #<parent>`와
`Blocked by: #<number>`를 기록한다.

`wayfinder`의 map은 하나의 GitHub 이슈로, 각 작업은 하위 이슈로 관리한다.
착수 시 담당자를 지정하고, 해결 내용을 댓글로 남긴 뒤 이슈를 닫는다.

---
---

<h1 align="center">
기여 규칙
</h1>

# **Git 컨벤션**

## **Branch**

### Branch convention

**Branch 종류**

- 주요 브랜치

```
master: 배포 코드가 있는 브랜치
└ develop: 실제 개발 브랜치
└ feature: 기능 구현 브랜치
└ fix: 버그 수정 브랜치
└ release: 서버에서 배포관리를 위한 브랜치(커스텀)
└ refactor: 코드 스타일 수정 및 리팩토링을 위한 브랜치
└ docs: readme 등 문서 작업하는 브랜치
└ hotfix: master에서 버그를 수정할 브랜치
```

**Branch Naming**

- 프론트 : front
- 백 : back
  ex) feature/back*develop*(기능)

## **Commit**

#### Commit Covention

**[파트] 태그: 제목**의 형태로 `]` , `:` 뒤에는 **space**가 있다.

```
ex) [FE] feat: 홈페이지 이미지추가

- feat: 기능 추가
- modify: 버그 아닌 코드 수정
- fix: 버그 수정
- refactor: 코드 리팩토링
- style: 코드 스타일(코드 컨벤션 추가) 수정
- docs: 문서 작업
- design: 프론트 CSS 수정
- test: 테스트 코드 작성
- chore: 프로젝트 설정 파일 수정
- create: 프로젝트 생성
- rename: 파일이나 폴더명을 수정하거나 옮기는 작업만 수행
- remove: 파일을 삭제하는 작업만 수행
```

## **Pull Request**

### Pull Request Covention

```
ex) [FE] feat: 홈페이지 이미지추가

- feat: 기능 추가
- modify: 버그 아닌 코드 수정
- fix: 버그 수정
- refactor: 코드 리팩토링
- style: 코드 스타일(코드 컨벤션 추가) 수정
- docs: 문서 작업
- design: 프론트 CSS 수정
- test: 테스트 코드 작성
- chore: 프로젝트 설정 파일 수정
- create: 프로젝트 생성
- rename: 파일이나 폴더명을 수정하거나 옮기는 작업만 수행
- remove: 파일을 삭제하는 작업만 수행
```

## **Pull Request Template**

## 어떤 이유로 PR를 하셨나요?

- [ ] feature 병합
- [ ] 버그 수정
- [ ] 코드 개선
- [ ] 기타(아래에 자세한 내용 기입해주세요)

## 세부 내용 - 왜 해당 PR이 필요한지 자세하게 설명해주세요

- 세부사항을 항목으로 설명해주세요

## MR하기 전에 확인해주세요

- [ ] 커밋 컨벤션을 맞췄나요?
- [ ] 오류나는 코드는 없나요?
- [ ] [라이센스](../LICENSE)와 [Prologue Contribution Guide](./contributionGuide.md)를 잘 숙지하셨나요?

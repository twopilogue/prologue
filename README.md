

### 😼 Git

<details>

<summary><strong> 🔍 브랜치 전략 및 컨벤션</strong></summary>

<div markdown=”1”>

#### **1. Git Workflow**

```
.
├── main: 배포 코드가 있는 브랜치
│    └── develop: 실제 개발 브랜치
│         ├── feature: 기능 구현 브랜치
│         ├── test: 테스트 코드 작성 브랜치
│         ├── fix: 버그 수정 브랜치
│         ├── refactor: 코드 스타일 수정 및 리팩토링을 위한 브랜치
│         └── docs: readme 등 문서를 작업하는 브랜치
└── hoxfix: main에서 버그를 수정할 브랜치
```

#### **2. Branch Naming**

```
⭐️ [해당하는 브랜치]/issue[이슈번호]
```

```
ex) develop
      ├── feature/issue25
      ├── fix/issue126
      └── ...
```

#### **3. Commit Convention**
[gitmoji](https://gitmoji.dev/) 사용

```
💡 EmojiTag Subject
```

```
 ex) 🐛 메인 페이지 버그 수정
```

**[파트] 태그: 제목**의 형태로 ], **:** 뒤에는 **space**가 있다.

- :sparkles: 기능 추가
- :white_check_mark: 테스트 코드 작성 및 수정
- :bug: 버그 수정
- :bento: asset 파일(이미지, 아이콘 등) 추가
- :recycle: 코드 리팩토링
- :memo: 문서 작업
- :lipstick: UI, 스타일 관련 파일 추가 및 수정
- :wrench: 프로젝트 설정 파일 수정
- :tada: 프로젝트 생성
- :truck: 파일명, 폴더명, 경로을 수정하거나 옮기는 작업
- :fire: 파일, 코드을 삭제하는 작업만 수행
- :pencil2: 단순 오타 수정
- :zap: 성능 개선
- :rotating_light: 컴파일러, 린트 에러 수정
- :heavy_plus_sign: dependency 추가
- :heavy_minus_sign: dependency 제거
- :see_no_evil: gitignore 추가 및 수정
- :mute: 로그 삭제

</details>

</div>

<br>


<hr/>


## **프로젝트 개요**

![로고 사진](./README.assets/%EB%9E%9C%EB%94%A9.png) <br>
프롤로그는 많은 사용자들이 깃허브 블로그를 쉽게 이용할 수 있도록 도와주는 솔루션 서비스입니다. </br>

## **주요기능**

- 기존의 CLI 환경에서 작업하던 번거로운 작업을 GUI를 통해 편리하게 이용할 수 있도록 개발하였습니다.
- Git Actions를 활용해 변경사항을 인식하고 자동으로 빌드-배포할 수 있습니다.
- 오픈소스 테마를 활용해 다양한 테마를 지원하고 프로젝트를 확장시킬 수 있습니다.

## **세부기능**

- **블로그**

  - 블로그 생성
    ![블로그 생성](./README.assets/%EB%B8%94%EB%A1%9C%EA%B7%B8%20%EC%83%9D%EC%84%B1.png)
    ![블로그 레이아웃](./README.assets/%EB%B8%94%EB%A1%9C%EA%B7%B8%20%EC%83%9D%EC%84%B1%20-%20%EB%A0%88%EC%9D%B4%EC%95%84%EC%9B%83.png)
    ![블로그 정보입력](./README.assets/%EB%B8%94%EB%A1%9C%EA%B7%B8%20%EC%83%9D%EC%84%B1%20-%20%EC%A0%95%EB%B3%B4%EC%9E%85%EB%A0%A5.png)
  - 블로그 설정
    ![프로필 설정](./README.assets/%ED%94%84%EB%A1%9C%ED%95%84%EC%84%A4%EC%A0%951.png)
    ![프로필 설정](./README.assets/%ED%94%84%EB%A1%9C%ED%95%84%EC%84%A4%EC%A0%952.png)
    ![카테고리 설정](./README.assets/%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC%20%EC%84%A4%EC%A0%95.png)
    ![페이지 설정](./README.assets/%ED%8E%98%EC%9D%B4%EC%A7%80%20%EC%84%A4%EC%A0%95.png)
  - 블로그 배포

    </br>

- **게시글**

  - 게시글 목록
    ![게시글 목록](./README.assets/%EA%B2%8C%EC%8B%9C%EA%B8%80%20%EB%AA%A9%EB%A1%9D.png)
  - 게시글 작성
    ![게시글 작성](./README.assets/%EA%B2%8C%EC%8B%9C%EA%B8%80%20%EC%9E%91%EC%84%B1.png)
    ![게시글 작성](./README.assets/%EA%B2%8C%EC%8B%9C%EA%B8%80%20%EC%9E%91%EC%84%B12.png)
  - 게시글 수정
    ![게시글 수정](./README.assets/%EA%B2%8C%EC%8B%9C%EA%B8%80%20%EC%88%98%EC%A0%95.png)
    ![게시글 수정](./README.assets/%EA%B2%8C%EC%8B%9C%EA%B8%80%20%EC%88%98%EC%A0%952.png)
  - 게시글 삭제

    </br>

- **레이아웃**

  - 레이아웃 구조 설정
    ![레이아웃 설정](./README.assets/%EB%A0%88%EC%9D%B4%EC%95%84%EC%9B%83%20%EC%84%A4%EC%A0%95.png)
  - 레이아웃 상세 설정
    ![레이아웃 설정](./README.assets/%EC%84%B8%EB%B6%80%EB%A0%88%EC%9D%B4%EC%95%84%EC%9B%83%20%EC%84%A4%EC%A0%95.png)
    </br>

## 프로젝트 빌드 방법

BackEnd

```
git clone  <repo URL>
cd backend/prologue
./gradlew
cd build/libs ssafy-web-project-1.0-SNAPSHOT.jar
```

FrontEnd

```
git clone  <repo URL>
cd frontend
npm install
npm start
```

## 개발자

- [BE] 윤석찬 (82chain@gmail.com)
- [BE] 권유나 (yunaghgh@gmail.com)
- [BE] 김태훈 (com151925@gmail.com)
- [FE] 강정현 (jhkang9820@gmail.com)
- [FE] 김주연 (dustn4325@gmail.com)
- [FE] 김연수 (jyeon3930@gmail.com)

## 아키텍처

![아키텍처](/README.assets/%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98.png)

## 커뮤니티 가이드

[Prologue document page](https://prologue-docs.site/docs/template/get-started/introduction)

- [행동강령](./Docs/contributorCovenant.md)
- [기여 가이드](./Docs/contributionGuide.md)
- [기여 컨벤션](./Docs/contributionConvention.md)

## License

- [MIT License](./LICENSE)

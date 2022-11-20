# **프로젝트 개요**

![로고 사진](./README.assets/%EB%9E%9C%EB%94%A9.png) <br>
프롤로그는 많은 사용자들이 깃허브 블로그를 쉽게 이용할 수 있도록 도와주는 솔루션 서비스입니다. </br>

# **주요기능**

- 기존의 CLI 환경에서 작업하던 번거로운 작업을 GUI를 통해 편리하게 이용할 수 있도록 개발하였습니다.
- Git Actions를 활용해 변경사항을 인식하고 자동으로 빌드-배포할 수 있습니다.
- 오픈소스 테마를 활용해 다양한 테마를 지원하고 프로젝트를 확장시킬 수 있습니다.

# **세부기능**

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

# 프로젝트 빌드 방법

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

# 개발자

- [BE] 윤석찬 (82chain@gmail.com)
- [BE] 권유나 (yunaghgh@gmail.com)
- [BE] 김태훈 (com151925@gmail.com)
- [FE] 강정현 (jhkang9820@gmail.com)
- [FE] 김주연 (dustn4325@gmail.com)
- [FE] 김연수 (jyeon3930@gmail.com)

# 아키텍처

![아키텍처](/README.assets/%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98.png)

# 커뮤니티 가이드

[Prologue document page](https://prologue-docs.site/docs/template/get-started/introduction)

- [행동강령](./Docs/contributorCovenant.md)
- [기여 가이드](./Docs/contributionGuide.md)
- [기여 컨벤션](./Docs/contributionConvention.md)

# License

- [MIT License](./LICENSE)

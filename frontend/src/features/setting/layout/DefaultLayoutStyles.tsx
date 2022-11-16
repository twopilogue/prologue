import { useAppSelector } from "app/hooks";
import React from "react";
import { Layout } from "react-grid-layout";
import { ComponentCheckConfig, selectCheckList, selectComponentLayoutList } from "slices/settingSlice";

interface defaultLayoutConfig {
  id: number;
  layout: Layout[];
  checkList: ComponentCheckConfig;
  struct?: string;
}

const DefaultLayoutStyles = () => {
  const custCheckList = useAppSelector(selectCheckList);
  const custLayout = useAppSelector(selectComponentLayoutList);

  const DefaultLayoutList: defaultLayoutConfig[] = [
    {
      id: 1,
      layout: [
        { i: "블로그 로고", x: 0, y: 0, w: 1, h: 1 },
        { i: "타이틀", x: 0, y: 1, w: 5, h: 3 },
        { i: "카테고리", x: 0, y: 4, w: 1, h: 4 },
        { i: "글 목록", x: 1, y: 4, w: 4, h: 4 },
      ],
      checkList: {
        logo: true,
        title: true,
        category: true,
        contents: true,
      },
      struct: `<div className='display-row'>
        <Logo />
        <Header />
      </div>
      <div className='display-row'>
        <Title />
      </div>
      <div className='display-row'>
        <div className='display-grid-l'>
          <Contents />
          <Category />
        </div>
      </div>`,
    },
    {
      id: 2,
      layout: [
        { i: "블로그 로고", x: 0, y: 0, w: 1, h: 1 },
        { i: "타이틀", x: 0, y: 1, w: 5, h: 3 },
        { i: "카테고리", x: 4, y: 4, w: 1, h: 4 },
        { i: "글 목록", x: 0, y: 4, w: 4, h: 4 },
      ],
      checkList: {
        logo: true,
        category: true,
        title: true,
        contents: true,
      },
      struct: `<div className='display-row'>
        <Logo />
        <Header />
      </div>
      <div className='display-row'>
        <Title />
      </div>
      <div className='display-row'>
        <div className='display-grid-r'>
          <Contents />
          <Category />
        </div>
      </div>`,
    },
    {
      id: 3,
      layout: [
        { i: "블로그 로고", x: 0, y: 0, w: 1, h: 1 },
        { i: "카테고리", x: 0, y: 1, w: 1, h: 7 },
        { i: "타이틀", x: 1, y: 1, w: 4, h: 3 },
        { i: "글 목록", x: 1, y: 4, w: 4, h: 4 },
      ],
      checkList: {
        logo: true,
        category: true,
        title: true,
        contents: true,
      },
      struct: `<div className='display-row'>
        <Logo />
        <Header />
      </div>
      <div className='display-row'>
        <div className='display-grid-l'>
          <Category />
          <div className='display-column'>
            <Title />
            <Contents />
          </div>
        </div>
      </div>`,
    },
    {
      id: 4,
      layout: [
        { i: "블로그 로고", x: 0, y: 0, w: 1, h: 1 },
        { i: "카테고리", x: 4, y: 1, w: 1, h: 7 },
        { i: "타이틀", x: 0, y: 1, w: 4, h: 3 },
        { i: "글 목록", x: 0, y: 4, w: 4, h: 4 },
      ],
      checkList: {
        logo: true,
        category: true,
        title: true,
        contents: true,
      },
      struct: `<div className='display-row'>
        <Logo />
        <Header />
      </div><div className='display-row'>
        <div className='display-grid-r'>
          <div className='display-column'>
            <Title />
            <Contents />
          </div>
          <Category />
        </div>
      </div>`,
    },
    {
      id: 5,
      layout: [
        { i: "블로그 로고", x: 0, y: 0, w: 1, h: 1 },
        { i: "프로필", x: 0, y: 1, w: 1, h: 2 },
        { i: "카테고리", x: 0, y: 3, w: 1, h: 5 },
        { i: "타이틀", x: 1, y: 1, w: 4, h: 3 },
        { i: "글 목록", x: 1, y: 4, w: 4, h: 4 },
      ],
      checkList: {
        logo: true,
        profile: true,
        category: true,
        title: true,
        contents: true,
      },
      struct: `<div className='display-row'>
        <Logo />
        <Header />
      </div>
      <div className='display-row'>
        <div className='display-grid-l'>
          <div className='display-column'>
            <Profile />
            <Category />
          </div>
          <div className='display-column'>
            <Title />
            <Contents />
          </div>
        </div>
      </div>`,
    },
    {
      id: 6,
      layout: [
        { i: "블로그 로고", x: 0, y: 0, w: 1, h: 1 },
        { i: "프로필", x: 4, y: 1, w: 1, h: 2 },
        { i: "카테고리", x: 4, y: 3, w: 1, h: 5 },
        { i: "타이틀", x: 0, y: 1, w: 4, h: 3 },
        { i: "글 목록", x: 0, y: 4, w: 4, h: 4 },
      ],
      checkList: {
        logo: true,
        profile: true,
        category: true,
        title: true,
        contents: true,
      },
      struct: `<div className='display-row'>
        <Logo />
        <Header />
      </div>
      <div className='display-row'>
        <div className='display-grid-r'>
          <div className='display-column'>
            <Title />
            <Contents />
          </div>
          <div className='display-column'>
            <Profile />
            <Category />
          </div>
        </div>
      </div>`,
    },
    {
      // 사용자 설정 테마
      id: 7,
      layout: custLayout,
      checkList: custCheckList,
      struct: "",
    },
  ];

  return DefaultLayoutList;
};

export default DefaultLayoutStyles;

/* [
        { i: "블로그 로고", x: 0, y: 0, w: 1, h: 1 },
        { i: "프로필", x: 0, y: 1, w: 1, h: 2 },
        { i: "카테고리", x: 0, y: 3, w: 1, h: 4 },
        { i: "페이지", x: 1, y: 0, w: 4, h: 1 },
        { i: "타이틀", x: 1, y: 1, w: 4, h: 3, static: true },
        { i: "글 목록", x: 1, y: 4, w: 4, h: 4, static: true },
      ]*/

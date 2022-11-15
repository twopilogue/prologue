import React from "react";
import { Layout } from "react-grid-layout";
import { ComponentCheckConfig } from "slices/settingSlice";

interface defaultLayoutConfig {
  id: number;
  layout: Layout[];
  checkList: ComponentCheckConfig;
}

export const DefaultLayoutList: defaultLayoutConfig[] = [
  {
    id: 1,
    layout: [
      { i: "블로그 로고", x: 0, y: 2, w: 1, h: 2 },
      { i: "카테고리", x: 0, y: 5, w: 1, h: 6 },
      { i: "타이틀", x: 1, y: 2, w: 6, h: 6 },
      { i: "글 목록", x: 1, y: 7, w: 4, h: 6 },
    ],
    checkList: {
      logo: true,
      category: true,
      title: true,
      contents: true,
    },
  },
  {
    id: 2,
    layout: [
      { i: "블로그 로고", x: 0, y: 2, w: 1, h: 2 },
      { i: "카테고리", x: 4, y: 6, w: 1, h: 6 },
      { i: "글 목록", x: 0, y: 7, w: 4, h: 6 },
      { i: "타이틀", x: 0, y: 2, w: 6, h: 6 },
    ],
    checkList: {
      logo: true,
      category: true,
      title: true,
      contents: true,
    },
  },
  {
    id: 3,
    layout: [
      { i: "블로그 로고", x: 0, y: 2, w: 1, h: 2 },
      { i: "카테고리", x: 0, y: 5, w: 1, h: 9 },
      { i: "타이틀", x: 1, y: 2, w: 4, h: 5 },
      { i: "글 목록", x: 1, y: 7, w: 4, h: 6 },
    ],
    checkList: {
      logo: true,
      category: true,
      title: true,
      contents: true,
    },
  },
  {
    id: 4,
    layout: [
      { i: "블로그 로고", x: 0, y: 0, w: 1, h: 2 },
      { i: "카테고리", x: 5, y: 5, w: 1, h: 13 },
      { i: "타이틀", x: 0, y: 2, w: 4, h: 5 },
      { i: "글 목록", x: 0, y: 7, w: 4, h: 6 },
    ],
    checkList: {
      logo: true,
      category: true,
      title: true,
      contents: true,
    },
  },
  {
    id: 5,
    layout: [
      { i: "블로그 로고", x: 0, y: 0, w: 1, h: 2 },
      { i: "프로필", x: 0, y: 2, w: 1, h: 3 },
      { i: "카테고리", x: 0, y: 5, w: 1, h: 6 },
      { i: "타이틀", x: 1, y: 2, w: 4, h: 5 },
      { i: "글 목록", x: 1, y: 7, w: 4, h: 6 },
    ],
    checkList: {
      logo: true,
      profile: true,
      category: true,
      title: true,
      contents: true,
    },
  },
  {
    id: 6,
    layout: [
      { i: "블로그 로고", x: 0, y: 0, w: 1, h: 2 },
      { i: "프로필", x: 4, y: 2, w: 1, h: 3 },
      { i: "카테고리", x: 4, y: 5, w: 1, h: 10 },
      { i: "타이틀", x: 0, y: 2, w: 4, h: 5 },
      { i: "글 목록", x: 0, y: 7, w: 4, h: 6 },
    ],
    checkList: {
      logo: true,
      profile: true,
      category: true,
      title: true,
      contents: true,
    },
  },
  {
    // 사용자 설정 테마
    id: 7,
    layout: [
      { i: "블로그 로고", x: 0, y: 0, w: 1, h: 2 },
      { i: "프로필", x: 0, y: 2, w: 1, h: 3 },
      { i: "카테고리", x: 0, y: 5, w: 1, h: 4 },
      { i: "페이지", x: 1, y: 0, w: 4, h: 2 },

      { i: "타이틀", x: 1, y: 2, w: 4, h: 5 },
      { i: "글 목록", x: 1, y: 7, w: 4, h: 6 },
    ],
    checkList: {
      logo: true,
      profile: true,
      category: true,
      page: true,
      title: true,
      contents: true,
    },
  },
];

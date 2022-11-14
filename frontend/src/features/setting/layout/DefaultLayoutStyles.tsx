import React from "react";
import { Layout } from "react-grid-layout";

interface defaultLayoutConfig {
  id: number;
  layout: Layout[];
}

export const DefaultLayoutList: defaultLayoutConfig[] = [
  {
    id: 1,
    layout: [
      { i: "블로그 로고", x: 0, y: 0, w: 1, h: 2, isResizable: false },
      { i: "프로필", x: 0, y: 2, w: 1, h: 3, isResizable: false },
      { i: "카테고리", x: 0, y: 5, w: 1, h: 4, isResizable: false },
      { i: "페이지", x: 1, y: 0, w: 4, h: 2, isResizable: false },

      { i: "타이틀", x: 1, y: 2, w: 4, h: 5, static: true, isResizable: false },
      { i: "글 목록", x: 1, y: 7, w: 4, h: 6, static: true, isResizable: false },
    ],
  },
  {
    id: 2,
    layout: [
      { i: "블로그 로고", x: 0, y: 0, w: 1, h: 2, isResizable: false },
      { i: "프로필", x: 0, y: 2, w: 1, h: 3, isResizable: false },
      { i: "카테고리", x: 0, y: 5, w: 1, h: 4, isResizable: false },
      { i: "페이지", x: 1, y: 0, w: 4, h: 2, isResizable: false },

      { i: "타이틀", x: 1, y: 2, w: 4, h: 5, static: true, isResizable: false },
      { i: "글 목록", x: 1, y: 7, w: 4, h: 6, static: true, isResizable: false },
    ],
  },
  {
    id: 3,
    layout: [
      { i: "블로그 로고", x: 0, y: 0, w: 1, h: 2, isResizable: false },
      { i: "프로필", x: 0, y: 2, w: 1, h: 3, isResizable: false },
      { i: "카테고리", x: 0, y: 5, w: 1, h: 4, isResizable: false },
      { i: "페이지", x: 1, y: 0, w: 4, h: 2, isResizable: false },

      { i: "타이틀", x: 1, y: 2, w: 4, h: 5, static: true, isResizable: false },
      { i: "글 목록", x: 1, y: 7, w: 4, h: 6, static: true, isResizable: false },
    ],
  },
  {
    id: 4,
    layout: [
      { i: "블로그 로고", x: 0, y: 0, w: 1, h: 2, isResizable: false },
      { i: "프로필", x: 0, y: 2, w: 1, h: 3, isResizable: false },
      { i: "카테고리", x: 0, y: 5, w: 1, h: 4, isResizable: false },
      { i: "페이지", x: 1, y: 0, w: 4, h: 2, isResizable: false },

      { i: "타이틀", x: 1, y: 2, w: 4, h: 5, static: true, isResizable: false },
      { i: "글 목록", x: 1, y: 7, w: 4, h: 6, static: true, isResizable: false },
    ],
  },
  {
    id: 5,
    layout: [
      { i: "블로그 로고", x: 0, y: 0, w: 1, h: 2, isResizable: false },
      { i: "프로필", x: 0, y: 2, w: 1, h: 3, isResizable: false },
      { i: "카테고리", x: 0, y: 5, w: 1, h: 4, isResizable: false },
      { i: "페이지", x: 1, y: 0, w: 4, h: 2, isResizable: false },

      { i: "타이틀", x: 1, y: 2, w: 4, h: 5, static: true, isResizable: false },
      { i: "글 목록", x: 1, y: 7, w: 4, h: 6, static: true, isResizable: false },
    ],
  },
  {
    id: 6,
    layout: [
      { i: "블로그 로고", x: 0, y: 0, w: 1, h: 2, isResizable: false },
      { i: "프로필", x: 0, y: 2, w: 1, h: 3, isResizable: false },
      { i: "카테고리", x: 0, y: 5, w: 1, h: 4, isResizable: false },
      { i: "페이지", x: 1, y: 0, w: 4, h: 2, isResizable: false },

      { i: "타이틀", x: 1, y: 2, w: 4, h: 5, static: true, isResizable: false },
      { i: "글 목록", x: 1, y: 7, w: 4, h: 6, static: true, isResizable: false },
    ],
  },
];

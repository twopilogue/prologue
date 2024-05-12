/* 배경색 기준 텍스트 컬러 설정 */

const getTextColor = (hexColor: string) => {
  const color = hexColor.slice(1); // # 제거
  const rgb = parseInt(color, 16); // 10진수 변환
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return luma < 127.5 ? "#ffffff" : "#000000";
};

export default getTextColor;

import $ from '@/utils/$'

const classicQuote = [
    '人生百态皆世间，歌尽年少行不欢。 谁将新樽乘旧月，那时浮华染流年。《永夜君王》—— 烟雨江南'
];
export default function () {
    return classicQuote[$.random(classicQuote.length - 1)]
}

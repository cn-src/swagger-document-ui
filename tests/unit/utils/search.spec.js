import search from '@/utils/search'

test('search', () => {
    search.append('id1', '中文');
    search.append('id2', 'demo');

    expect(search.match('文')[0].text).toBe('中文');
    expect(search.match('zh')[0].text).toBe('中文');
    expect(search.match('wen')[0].text).toBe('中文');
    expect(search.match('demo')[0].text).toBe('demo');
});

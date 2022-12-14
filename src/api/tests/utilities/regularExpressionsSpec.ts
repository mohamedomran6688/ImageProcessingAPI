import matchResizeUrl from '../../utilities/regularExpressions';

matchResizeUrl;

// erro format url
it('matchResizeUrl("/resize" to equal false', () => {
  expect(matchResizeUrl('/resize')).toEqual(false);
});

//with extension file
it('matchResizeUrl("/resize/?file_name=1&width=100&height=500" to equal true', () => {
  expect(
    matchResizeUrl('/resize?file_name=1.jpg&width=100&height=500')
  ).toEqual(true);
});

//without extension file
it('matchResizeUrl("/resize/?file_name=1&width=100&height=500" to equal true', () => {
  expect(matchResizeUrl('/resize/?file_name=1&width=100&height=500')).toEqual(
    true
  );
});

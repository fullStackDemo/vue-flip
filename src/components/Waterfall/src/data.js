const assumData = [];

const generteHtml = num => {
  let res = '';
  for (let index = 0; index < num; index++) {
    res += (index + 1) + '\r\n';
  }
  return res;
};

for (let i = 1; i < 50; i++) {
  assumData.push({
    name: i,
    text: generteHtml(i)
  });
}

export default assumData;
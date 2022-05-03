const columns = [
  // {
  //   title: "Name",
  //   dataIndex: "name",
  //   scopedSlots: { customRender: "name" },
  // },
  // {
  //   title: "Cash Assets",
  //   dataIndex: "money",
  //   className: "column-money",
  // },
  // { 
  //   title: "Address",
  //   dataIndex: "address",
  // },
  {
    title: "序号",
    dataIndex: "index",
  },
  {
    title: "一级指标",
    dataIndex: "firstTarget",
  },
  {
    title: "工作目标",
    dataIndex: "target",
  },
  {
    title: "考核部门",
    dataIndex: "department",
  },
  {
    title: "分值",
    dataIndex: "score",
  },
  {
    title: "考核等级",
    dataIndex: "grade",
  },
  {
    title: "备注（ 任务之 外&创新 ）",
    dataIndex: "remarks",
  },
];
export { columns };
// {
//   title: '序号',
//   dataIndex: 'name',
//   customRender: (text, row, index) => {
//     if (index < 4) {
//       return <a href="javascript:;">{text}</a>;
//     }
//     return {
//       children: <a href="javascript:;">{text}</a>,
//       attrs: {
//         colSpan: 5,
//       },
//     };
//   },
// },
// {
//   title: 'Age',
//   dataIndex: 'age',
//   customRender: renderContent,
// },
// {
//   title: 'Home phone',
//   colSpan: 2,
//   dataIndex: 'tel',
//   customRender: (value, row, index) => {
//     const obj = {
//       children: value,
//       attrs: {},
//     };
//     console.log(row)
//     if (index === 2) {
//       obj.attrs.rowSpan = 2;
//     }
//     // These two are merged into above cell
//     if (index === 3) {
//       obj.attrs.rowSpan = 0;
//     }
//     if (index === 4) {
//       obj.attrs.colSpan = 1;
//     }
//     return obj;
//   },
// },
// {
//   title: 'Phone',
//   colSpan: 0,
//   dataIndex: 'phone',
//   customRender: renderContent,
// },
// {
//   title: 'Address',
//   dataIndex: 'address',
//   customRender: renderContent,
// },

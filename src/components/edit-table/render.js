const Render_firstTarget = function(status) {
  const scopedSlots = { customRender: "firstTarget" };
  const customRender = text => {
    return {
      children: <span>{text.value}</span>,
      attrs: {
        rowSpan: text.rowSpan,
      },
    };
  };
  const obj = {
    title: "一级指标",
    dataIndex: "firstTarget",
    width: 180,
  };
  if (status) {
    return {
      ...obj,
      scopedSlots,
    };
  } else {
    return {
      ...obj,
      customRender,
    };
  }
};
const Render_target_index = function(status) {
  const scopedSlots = { customRender: "target_index" };
  const customRender = text => {
    console.log(text);
    return {
      children: <span>{text.index}</span>,
      attrs: {
        rowSpan: text.rowSpan,
      },
    };
  };
  const obj = {
    title: "工作目标",
    dataIndex: "target_index",
    colSpan: 0,
    width: 80,
  };
  if (status) {
    return {
      ...obj,
      scopedSlots,
    };
  } else {
    return {
      ...obj,
      customRender,
    };
  }
};
const Render_target = function(status) {
  const scopedSlots = { customRender: "target" };
  const customRender = text => {
    return {
      children: <span>{text.value}</span>,
      attrs: {
        rowSpan: text.rowSpan,
      },
    };
  };
  const obj = {
    title: "工作目标",
    colSpan: 2,
    dataIndex: "target",
    width: 180,
  };
  if (status) {
    return {
      ...obj,
      scopedSlots,
    };
  } else {
    return {
      ...obj,
      customRender,
    };
  }
};
export default {
  Render_firstTarget,
  Render_target,
  Render_target_index,
};

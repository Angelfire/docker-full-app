export const sanitize = (str) => {
  const map = {
    "&": "&amp;",
    '"': "&quot;",
    "'": "&apos;",
    "<": "&lt;",
    ">": "&gt;",
  };

  const reg = /[&"'\<>]/g;

  return str.replace(reg, (match) => map[match]);
};

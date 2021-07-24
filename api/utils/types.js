const Types = {
  array: "array",
  string: "string",
  unknown: undefined,
};
Object.freeze(Types);

function VariableType(type, metaData) {
  this.type = type;
  this.metaData = metaData;
}

const generateType = (value, key, map) => {
  if (value instanceof Array) {
    map.set(key, new VariableType(Types.array, { value }));
  }
  // 2 conditions are added so as to handle string creation using str = "" and str = new String()
  else if (typeof value === "string" || value instanceof String) {
    map.set(key, new VariableType(Types.string, { value }));
  } else {
    map.set(key, new VariableType(Types.unknown, { value }));
  }
};

module.exports = VariableType;
exports = module.exports;
exports.Types = Types;
exports.generateType = generateType;

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"], // Essential for Expo projects
    plugins: ["react-native-worklets/plugin"],
  };
};

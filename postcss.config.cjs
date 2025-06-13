const tailwindcss = require('@tailwindcss/postcss')  // ✅ 달라진 포인트!
const autoprefixer = require('autoprefixer')

module.exports = {
  plugins: [
    tailwindcss(),  // ✅ 여기서도 함수 형태
    autoprefixer()
  ]
}
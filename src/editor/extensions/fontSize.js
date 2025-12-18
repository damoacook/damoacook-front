import { Extension } from '@tiptap/core';

const FontSize = Extension.create({
  name: 'fontSize',

  addGlobalAttributes() {
    return [
      {
        // textStyle 마크에 fontSize 속성을 달아줌
        types: ['textStyle'],
        attributes: {
          fontSize: {
            default: null,
            // HTML로 렌더링할 때 style="font-size: xxpx" 반영
            renderHTML: attributes => {
              if (!attributes.fontSize) return {};
              return { style: `font-size: ${attributes.fontSize}` };
            },
            // HTML을 읽어올 때 style.fontSize 값을 다시 상태로 복원
            parseHTML: element => ({
              fontSize: element.style?.fontSize || null,
            }),
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize:
        size =>
        ({ chain }) => {
          return chain().setMark('textStyle', { fontSize: size }).run();
        },
      unsetFontSize:
        () =>
        ({ chain }) => {
          // fontSize만 null로 (color 등 다른 스타일은 유지)
          return chain().setMark('textStyle', { fontSize: null }).run();
        },
    };
  },
});

export default FontSize;
const { Quill } = typeof window === "object" ? require("react-quill") : () => false;

// hljs.configure({
//    languages: ["javascript", "react", "typescript", "css", "html", "Node REPL"],
// });

export const modules = {
   // syntax: {
   //    highlight: (text: any) => hljs.highlightAuto(text).value,
   // },
   toolbar: [
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      ["bold", "italic"],
      ["blockquote", "code-block"],
      [{ color: ["#333333", "#FBFCFD", "#6699FF", "#F8F9FA", "#ced4da"] }, { background: ["#333333", "#FBFCFD", "#6699FF", "#e9ecef", "rgba(0,0,0,0.2)"] }], // dropdown with defaults from theme
      // [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image", "video"],
   ],
};


export const formats = ["font", "size", "bold", "italic", "underline", "strike", "blockquote",
   "code-block", "color", "background", "align", "list", "bullet", "indent", "link", "image", "blockquote", "video", "insert"];

if (typeof window === "object") {
   const bold = Quill.import("formats/bold");
   bold.tagName = "b"; // Quill uses <strong> by default
   Quill.register(bold, true);

   const italic = Quill.import("formats/italic");
   italic.tagName = "i"; // Quill uses <em> by default
   Quill.register(italic, true);
}

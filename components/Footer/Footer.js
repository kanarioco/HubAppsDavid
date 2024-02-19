import "./Footer.css";
const template = () => `
<p class="createdBy">Created By: KANARIOco</p>
`;

export const PrintTemplateFooter = () => {
  document.querySelector("footer").innerHTML = template();
};

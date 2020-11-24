import "./editor.scss";

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
import { InnerBlocks } from "@wordpress/block-editor";
import ContainerControls from "./controls";

registerBlockType("abhinash/container", {
	title: __("Layout Container"), // Block title.
	icon: "align-center", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: "rez-blocks", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [__("container"), __("wrapper"), __("width")],
	selector: "div",

	attributes: {
		bgColor: { type: "string" },
		textColor: { type: "string" },
		gradient: { type: "string" },
		imageObj: { type: "object" },
		align: {
			type: "string",
			default: "full",
		},
	},
	supports: {
		align: ["full"],
	},
	edit: (props) => {
		const handleTextColorChange = (color) => {
			props.setAttributes({ textColor: color });
		};
		const handleBgColorChange = (color) => {
			props.setAttributes({ bgColor: color });
		};
		const handleGradientChange = (gradient) => {
			props.setAttributes({ gradient: gradient });
		};
		const handleImageChange = (obj) => {
			props.setAttributes({ imageObj: obj });
		};
		const computedBackground = () => {
			if (
				props.attributes.gradient ||
				(props.attributes.imageObj && props.attributes.imageObj.url)
			) {
				const { gradient } = props.attributes;
				const { url } = props.attributes.imageObj
					? props.attributes.imageObj
					: {};

				if (gradient && url) return `${gradient}, url(${url})`;
				if (!gradient && url) return `url(${url})`;
			}
			return props.attributes.gradient || props.attributes.bgColor;
		};
		return (
			<div>
				<ContainerControls
					imageObj={props.attributes.imageObj}
					textColor={props.attributes.textColor}
					bgColor={props.attributes.bgColor}
					imageObj={props.attributes.imageObj}
					bgGradient={props.attributes.gradient}
					onImageChange={handleImageChange}
					onGradientChange={handleGradientChange}
					onBgColorChange={handleBgColorChange}
					onTextColorChange={handleTextColorChange}
				/>
				<div
					className={props.className + " container-wrapper"}
					style={{
						background: computedBackground(),
						backgroundSize: "cover",
						backgroundRepeat: "none",
						color: props.attributes.textColor,
					}}
				>
					<div className="editor-container-display">
						<InnerBlocks />
					</div>
				</div>
			</div>
		);
	},
	save: (props) => {
		const computedBackground = () => {
			if (
				props.attributes.gradient ||
				(props.attributes.imageObj && props.attributes.imageObj.url)
			) {
				const { gradient } = props.attributes;
				const { url } = props.attributes.imageObj
					? props.attributes.imageObj
					: {};

				if (gradient && url) return `${gradient}, url(${url})`;
				if (!gradient && url) return `url(${url})`;
			}
			return props.attributes.gradient || props.attributes.bgColor;
		};
		return (
			<div
				className={props.className + " py-5"}
				style={{
					background: computedBackground(),
					color: props.attributes.textColor,
					backgroundSize: "cover",
					backgroundRepeat: "none",
				}}
			>
				<div className="container">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
});

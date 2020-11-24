import "./editor.scss";

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
import { InnerBlocks, InspectorControls } from "@wordpress/block-editor";
import {
	__experimentalGradientPicker as GradientPicker,
	Panel,
	PanelBody,
	PanelRow,
	ColorPalette,
} from "@wordpress/components";
import colors from "../colors.json";

registerBlockType("abhinash/container", {
	title: __("Layout Container"), // Block title.
	icon: "align-center", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: "rez-blocks", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [__("container"), __("wrapper"), __("width")],
	selector: "div",

	attributes: {
		bgColor: { type: "string" },
		textColor: { type: "string" },
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
		return (
			<div>
				{
					<InspectorControls>
						<Panel title="Layout Container Settings">
							<PanelBody
								title="Options"
								icon="admin-settings"
								initialOpen={true}
							>
								<PanelRow>Text color</PanelRow>
								<PanelRow>
									<ColorPalette
										colors={colors}
										value={props.attributes.textColor}
										onChange={handleTextColorChange}
									/>
								</PanelRow>
								<PanelRow>Background color</PanelRow>
								<PanelRow>
									<ColorPalette
										colors={colors}
										value={props.attributes.bgColor}
										onChange={handleBgColorChange}
									/>
								</PanelRow>
							</PanelBody>
						</Panel>
					</InspectorControls>
				}{" "}
				<div
					className={props.className + " container-wrapper"}
					style={{
						backgroundColor: props.attributes.bgColor,
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
		return (
			<div
				className={props.className}
				style={{
					backgroundColor: props.attributes.bgColor,
					color: props.attributes.textColor,
				}}
			>
				<div className="container">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
});

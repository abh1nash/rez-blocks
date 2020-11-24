/**
 * BLOCK: Page Header
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import "./editor.scss";
import "./style.scss";

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { withSelect } = wp.data;
import {
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from "@wordpress/block-editor";
import {
	Panel,
	PanelBody,
	PanelRow,
	Button,
	TextControl,
} from "@wordpress/components";

const pageHeaderEditor = (props) => {
	// Creates a <p class='wp-block-cgb-block-rez-blocks'></p>.
	const handleHeaderTxtChange = (e) => {
		props.setAttributes({ headerTxt: e });
	};
	const handleButtonTxtChange = (e) => {
		props.setAttributes({ buttonTxt: e });
	};
	const handleDescTxtChange = (e) => {
		props.setAttributes({ descTxt: e });
	};
	const handleUpdateImg = (image) => {
		props.setAttributes({ imageObj: image });
	};
	const handleURL = (url) => {
		props.setAttributes({ destinationURL: url });
	};
	return (
		// <div className={props.className}>
		<div
			className="atf-hero"
			style={{
				"--bg-img": `url(${
					props.attributes.imageObj ? props.attributes.imageObj.url : undefined
				})`,
			}}
		>
			{
				<InspectorControls>
					<Panel title="Page Header Settings">
						<PanelBody
							title="Settings"
							icon="admin-settings"
							initialOpen={true}
						>
							<PanelRow>
								<MediaUploadCheck fallback="You do not have permissions to make changes to the media.">
									<MediaUpload
										title={__("Background image", "image-selector")}
										allowedTypes={["image"]}
										value={props.attributes.imageObj}
										onSelect={handleUpdateImg}
										render={({ open }) => (
											<Button
												className={
													"editor-post-featured-image__toggle image-selector-btn"
												}
												style={{
													backgroundImage:
														"linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0.6)), url('" +
														(props.attributes.imageObj
															? props.attributes.imageObj.url
															: "") +
														"')",
												}}
												onClick={open}
											>
												{__("Choose background image", "image-selector")}
											</Button>
										)}
									></MediaUpload>
								</MediaUploadCheck>
							</PanelRow>
							{props.attributes.imageObj && (
								<PanelRow>
									<Button onClick={() => handleUpdateImg(0)} isDestructive>
										Remove Image
									</Button>
								</PanelRow>
							)}
							<PanelRow>
								<TextControl
									label="Button Destination URL"
									value={props.attributes.destinationURL}
									onChange={handleURL}
								/>
							</PanelRow>
						</PanelBody>
					</Panel>
				</InspectorControls>
			}
			<div className="atf-hero-content">
				<div className="container h-100">
					<div className="row h-100">
						<div className="col-12 col-md-8 col-lg-6 align-self-center">
							<RichText
								className="cta-title text-primary"
								tagName="h1"
								placeholder="Main Heading"
								value={props.attributes.headerTxt}
								onChange={handleHeaderTxtChange}
							/>
							<RichText
								tagName="div"
								className="cta-desc"
								placeholder="Short Description"
								value={props.attributes.descTxt}
								onChange={handleDescTxtChange}
							/>
							<div>
								<RichText
									tagName="a"
									className="cta-btn"
									placeholder="Action Button"
									value={props.attributes.buttonTxt}
									onChange={handleButtonTxtChange}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const fieldData = withSelect((select, props) => {
	// Get the image ID
	const imageId = props.attributes.bgImageId;

	// Create "props.imageObj"
	return {
		// If image defined, get the image "media" object
		imageObj: imageId ? select("core").getMedia(imageId) : null,
	};
});

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType("abhinash/header", {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __("Page Header"), // Block title.
	icon: "welcome-view-site", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: "rez-blocks", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [__("page header"), __("hero"), __("atf")],
	selector: "div",

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */

	attributes: {
		buttonTxt: { type: "string" },
		headerTxt: { type: "string" },
		descTxt: { type: "string" },
		imageObj: { type: "object" },
		destinationURL: { type: "string" },
		align: {
			type: "string",
			default: "full",
		},
	},
	supports: {
		align: ["full"],
	},
	// getEditWrapperProps() {
	// 	return {
	// 		"data-align": "full",
	// 	};
	// },

	edit: fieldData(pageHeaderEditor),

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: (props) => {
		return (
			<div
				className="atf-hero"
				style={{
					"--bg-img": `url(${
						props.attributes.imageObj
							? props.attributes.imageObj.url
							: undefined
					})`,
				}}
			>
				<div className="container h-100">
					<div className="row h-100">
						<div className="col-12 col-md-8 col-lg-6 align-self-center">
							<h1 className="atf-hero-content text-primary">
								{props.attributes.headerTxt}
							</h1>
							<div class="lead my-3 py-1">{props.attributes.descTxt}</div>
							<div>
								<a
									href={props.attributes.destinationURL}
									className="btn btn-accent btn-lg text-white text-uppercase font-weight-bold"
								>
									{props.attributes.buttonTxt}
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	},
});

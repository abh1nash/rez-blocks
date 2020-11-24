const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

import shortid from "shortid";
shortid.characters(
	"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_-"
);

import { RichText, InspectorControls } from "@wordpress/block-editor";
import {
	__experimentalNumberControl as NumberControl,
	Panel,
	PanelBody,
	PanelRow,
	FormToggle,
} from "@wordpress/components";

import "./editor.scss";

registerBlockType("abhinash/faqs", {
	title: __("FAQs"),
	icon: "editor-help",
	category: "rez-blocks",
	keywords: [__("faqs"), __("frequent"), __("questions"), __("query")],
	selector: "div",

	attributes: {
		questions: { type: "array", default: [] },
		schema: { type: "string" },
		containerId: { type: "string" },
		hasSchema: { type: "boolean", default: true },
	},

	edit: ({ attributes, setAttributes }) => {
		const setQuestionsCount = (value) => {
			setAttributes({
				containerId: `container-${shortid.generate()}`,
			});
			if (attributes.questions.length <= value) {
				while (attributes.questions.length <= value) {
					let updatedQuestions = attributes.questions;
					let qid = "q-" + shortid.generate();
					updatedQuestions.push({ q: "", a: "", id: qid });
					setAttributes({
						questions: updatedQuestions,
					});
				}
			}
			if (attributes.questions.length > value) {
				while (attributes.questions.length > value) {
					let updatedQuestions = attributes.questions;
					updatedQuestions.pop();
					setAttributes({
						questions: updatedQuestions,
					});
				}
			}
		};
		const generateSchema = () => {
			const schema = {
				"@context": "https://schema.org",
				"@type": "FAQPage",
				mainEntity: [],
			};
			const quesEntity = (q, a) => {
				return {
					"@type": "Question",
					name: q,
					acceptedAnswer: {
						"@type": "Answer",
						text: a,
					},
				};
			};
			attributes.questions.forEach((entry) => {
				schema.mainEntity.push(quesEntity(entry.q, entry.a));
			});
			setAttributes({ schema: JSON.stringify(schema) });
		};
		const setQuestion = (index, value, answer = false) => {
			let updatedQuestions = [...attributes.questions];
			if (answer) {
				updatedQuestions[index].a = value;
				// setAttributes({ questions: updatedQuestions });
			} else {
				updatedQuestions[index].q = value;
			}
			setAttributes({ questions: updatedQuestions });
			generateSchema();
		};
		const handleAddQuestion = (index) => {
			let updatedQuestions = [...attributes.questions];
			updatedQuestions.splice(index + 1, 0, {
				q: "",
				a: "",
				id: "q-" + shortid.generate(),
			});
			setAttributes({ questions: updatedQuestions });
		};
		const handleRemoveQuestion = (index) => {
			let updatedQuestions = [...attributes.questions];
			updatedQuestions.splice(index, 1);
			setAttributes({ questions: updatedQuestions });
		};
		const handleSchemaToggle = () => {
			setAttributes({ hasSchema: !attributes.hasSchema });
		};
		return (
			<div>
				{
					<InspectorControls>
						<Panel title="FAQs Settings">
							<PanelBody
								title="Settings"
								icon="admin-settings"
								initialOpen={true}
							>
								<PanelRow>
									<NumberControl
										label="No. of Questions"
										value={attributes.questions.length}
										onChange={setQuestionsCount}
									/>
								</PanelRow>
							</PanelBody>
							<PanelBody title="SEO" icon="search" initialOpen={false}>
								<PanelRow>
									<FormToggle
										checked={attributes.hasSchema}
										onChange={handleSchemaToggle}
									/>
									Generate rich results schema
								</PanelRow>
							</PanelBody>
						</Panel>
					</InspectorControls>
				}
				{attributes.questions.length < 1 && (
					<div className="editor-placeholder-text">
						Start adding FAQs by setting the value for number of questions
						through the sidebar <b>Settings</b>.
					</div>
				)}
				<div className="editor-faqs-list">
					{attributes.questions.length > 0 &&
						attributes.questions.map((question, index) => {
							return (
								<div className="editor-faq-item" key={index}>
									<div className="editor-faq-header">
										<div className="editable-header">
											<RichText
												value={question.q}
												onChange={(value) => setQuestion(index, value)}
												placeholder="Type question here..."
											/>
										</div>
										<div className="editor-remove-faq-item-container">
											<button
												onClick={() => handleRemoveQuestion(index)}
												className="editor-remove-faq-item"
												title="Remove Question"
											>
												&times;
											</button>
										</div>
									</div>
									<div className="editor-faq-expand-item">
										<RichText
											value={question.a}
											onChange={(value) => setQuestion(index, value, true)}
											placeholder="Type answer here..."
											selector="p"
										/>
										<div className="editor-add-faq-item-container">
											<button
												onClick={() => handleAddQuestion(index)}
												className="editor-add-faq-item"
												title="Add Question"
											>
												+
											</button>
										</div>
									</div>
								</div>
							);
						})}
				</div>
			</div>
		);
	},

	save: ({ attributes }) => {
		return (
			<div>
				{attributes.hasSchema && (
					<script type="application/ld+json">{attributes.schema}</script>
				)}
				<div className="accordion my-3" id={attributes.containerId}>
					{attributes.questions.map((question) => {
						const { q, a, id } = question;
						return (
							<div className="card">
								<div className="card-header text-left" id={`heading-${id}`}>
									<h2 className="mb-0">
										<button
											className="btn btn-link text-left collapsed"
											type="button"
											data-toggle="collapse"
											data-target={`#${id}`}
											aria-expanded="false"
											aria-controls={id}
										>
											{q}
										</button>
									</h2>
								</div>
								<div
									id={id}
									className="hide collapse"
									aria-labelledby={`heading-${id}`}
									data-parent={"#" + attributes.containerId}
								>
									<div
										className="card-body text-dark"
										dangerouslySetInnerHTML={{
											__html: a,
										}}
									></div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	},
});

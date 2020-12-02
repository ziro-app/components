export const docTypeResponseTemplate =
{
	id: "4d222745-0438-4cd2-984f-e3bc087bcbcc",
	version: "v2",
	data: [
		{
			classification: {
				confidence: 0.97,
				type: "CNH",
				face: "front-back"
			},
			fieldname: "fileName",
			page: 0
		},
	],
	metadata: {
		filesInfo: [
			{
				encoding: "base64",
				fieldname: "fileName",
				mimetype: "image/png",
				name: "fileName",
				pages: 1,
				sha256: "41c2ece339abfcf9ba1e7d5a60666162a24ef34ba95adeb41ed1d9721c91c6b0",
				size: 567098
			}
		]
	}
}

export type Response = typeof docTypeResponseTemplate;
export type TypeCheck = (obj: any) => obj is Response;
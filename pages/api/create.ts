import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
	const {name, date} = req.body

	try {
		await prisma.note.create({
			data: {
				name,
				date
			}
		})
		res.status(200).json({message: 'Note Created'})
	} catch (error) {
		console.log("Failure");
	}
}

import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { comparePasswords, createJWT } from "@/lib/auth";
import { serialize } from "cookie";

export default async function signin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const user = await db.user.findUnique({
      where: {
        email: req.body.email
      }
    });
    const isUser = user && await comparePasswords(req.body.password, user.password);
    if (isUser) {
      const jwt = await createJWT(user);

      // set it as a string for typescript to stop shouting at me
      res.setHeader("Set-Cookie", serialize(process.env.COOKIE_NAME as string, jwt, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7
      }));

      res.status(201);
      res.json({});
    } else {
      res.status(401);
      res.json({});
    }
  }

}

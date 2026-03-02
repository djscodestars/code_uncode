import { NextApiRequest, NextApiResponse } from "next";

/** @typedef {{ count: number } | { error: string }} */

/**
 * @param {NextApiRequest} req
 * @param {NextApiResponse<Data>} res
 */
export default async function handler(req, res) {
  try {
    const apiUrl = "https://unstop.com/api/public/competition/1651390";

    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch remote API" });
    }

    const json = await response.json();

    const count = json?.data?.competition?.registerCount ?? null;

    if (count === null) {
      return res.status(500).json({ error: "Count not found" });
    }

    const parsed =
      typeof count === "string" ? parseInt(count.replace(/,/g, ""), 10) : count;

    // prevent caching
    res.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate");

    res.status(200).json({ count: parsed });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}
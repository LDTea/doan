import {Router} from "express";
import { StuffModel } from "../models/stuff.model.js";
import handler from 'express-async-handler';

const router = Router();

router.get(
  '/',
  handler(async (req, res) => {
    const stuffs = await StuffModel.find({});
    res.send(stuffs);
  })
);

router.get(
  '/tags',
  handler(async (req, res) => {
    const tags = await StuffModel.aggregate([
      {
        $unwind: '$tags',
      },
      {
        $group: {
          _id: '$tags',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          count: '$count',
        },
      },
    ]).sort({ count: -1 });

    const all = {
      name: 'All',
      count: await StuffModel.countDocuments(),
    };

    tags.unshift(all);

    res.send(tags);
  })
);

router.get(
  '/search/:searchTerm',
  handler(async (req, res) => {
    const { searchTerm } = req.params;
    const searchRegex = new RegExp(searchTerm, 'i');

    const stuffs = await StuffModel.find({ name: { $regex: searchRegex } });
    res.send(stuffs);
  })
);

router.get(
  '/tag/:tag',
  handler(async (req, res) => {
    const { tag } = req.params;
    const stuffs = await StuffModel.find({ tags: tag });
    res.send(stuffs);
  })
);

router.get(
  '/:stuffId',
  handler(async (req, res) => {
    const { stuffId } = req.params;
    const stuff = await StuffModel.findById(stuffId);
    res.send(stuff);
  })
);

export default router;
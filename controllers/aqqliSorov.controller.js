const { sendErrorResponse } = require("../helpers/send_error_res");
const sequelize = require("../config/db");
const Machine = require("../models/machine.model");
const Region = require("../models/region.model");
const District = require("../models/district.model");
const { Op } = require("sequelize");

const findMachinesInsideThedate = async (req, res) => {
  try {
    const { start_time, end_time } = req.body;

    const users = await sequelize.query(
      `SELECT * FROM users s
       LEFT JOIN contract c ON s.id = c."userId"
       WHERE (c.start_time BETWEEN :start_time AND :end_time OR c.start_time IS NULL)`,
      {
        replacements: { start_time, end_time },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Xatolik yuz berdi" });
  }
};
const getMachinesWithImages = async (req, res) => {
  try {
    const users = await sequelize.query(
      `SELECT M.id, M.name, COUNT(I.id) AS image_count
FROM Machine M
LEFT JOIN image I ON M.id = I."machineId"
GROUP BY M.id, M.name
HAVING COUNT(I.id) >= 3;
`
    );

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Xatolik yuz berdi" });
  }
};

const getMachines = async (req, res) => {
  try {
    const users = await sequelize.query(
      `SELECT * FROM users s
       LEFT JOIN contract c ON s.id = c."userId"
LEFT JOIN region R ON M."regionId" = R."id"
LEFT JOIN district D ON M."districtId" = D."id"
WHERE R.name = :region_name AND D.name = :district_name
`,
      {
        replacements: { start_time, end_time },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    res.send({ users });
  } catch (error) {
    console.log(error);
  }
};
const getRejectedContracts = async (req, res) => {
  try {
    const { start_time, end_time } = req.body;

    const users = await sequelize.query(
      `SELECT * FROM contract c
       LEFT JOIN machine M ON M.id = c."machineId"
       LEFT JOIN status S ON S.id = c."statusId"
       WHERE (c.start_time BETWEEN :start_time AND :end_time OR c.start_time IS NULL)
       AND S.status LIKE 'rejected';
`,
      {
        replacements: { start_time, end_time },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Xatolik yuz berdi" });
  }
};


module.exports = {
  findMachinesInsideThedate,
  getMachines,
  getMachinesWithImages,
  getRejectedContracts
};

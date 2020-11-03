module.exports = (sequelize, Sequelize) => {
  const Scrape = sequelize.define(
    'scrape',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      datefound: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      url: {
        type: Sequelize.STRING
      },
      screenshot: {
        type: Sequelize.BLOB,
        defaultValue: null
      },
      textfound: {
        type: Sequelize.STRING
      },
      hits: {
        type: Sequelize.INTEGER
      },
      score: {
        type: Sequelize.INTEGER
      },
      flagged: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    },
    { timestamps: false }
  )

  return Scrape
}

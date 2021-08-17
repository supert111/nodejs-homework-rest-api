const current = async (req, res, next) => {
  const userProfile = {
    email: req.user.email,
    subscription: req.user.subscription
  };
  res.json({
    status: 'success',
    code: 200,
    data: {
      userProfile
    }
  })
}

// try {
//   const userId = req.user.id;
//   const userProfile = await
// } catch (error) {

// }

module.exports = current;

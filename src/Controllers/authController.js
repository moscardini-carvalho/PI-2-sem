const renderLoginPage = (req, res) => {
  res.render('login/login', { isLoginPage: true })
}

const loginUser = (req, res) => {
  const { username, password } = req.body

  if (username && password) {
    return res.redirect('/funcionario')
  } else {
    return res.status(401).send('Credenciais inválidas')
  }
}

module.exports = {
  renderLoginPage,
  loginUser
}

import Fuse from 'fuse.js'

const autofills = [ '856 Nec, Rd. Chatswood, NT',   'Ap #641-9847 Et Ave Surry Hills, ACT',   'Ap #715-5780 Sollicitudin Avenue Bankstown, SA',   'Ap #313-4747 Et Ave Surry Hills, QSLD',   '638-2302 Quis Ave Bankstown, NSW',   '4832 Sed Street Chatswood, SA',   'Ap #403-1044 Facilisis, St. Chatswood, NT',   '298-7914 Neque Ave Bankstown, QSLD',   '730-5753 Accumsan Avenue Chatswood, NSW',   'Ap #696-2737 Praesent Ave Surry Hills, QSLD',   '829-4052 Mauris Street Newtown, QSLD',   '514-2290 Eu Ave Bankstown, TAS',   'Ap #316-4986 Varius. Rd. Bankstown, NT',   'Ap #506-8838 Velit Avenue Newtown, SA',   'Ap #450-3818 Phasellus Rd. Bankstown, QSLD',   '9392 Laoreet St. Mortdale, SA',   '232-1032 Sit St. Bankstown, QSLD',   'Ap #486-8377 Elit Avenue Newtown, QSLD',   '825-7313 Tristique St. Chatswood, TAS',   '3559 Nulla Rd. Newtown, TAS',   'Ap #499-4225 Vulputate Road Bankstown, SA',   '444-7874 Hendrerit. St. Newtown, NT',   'Ap #372-7680 Fringilla Street Chatswood, TAS',   '950-7183 Sed Av. Chatswood, SA',   '616-5930 Aliquet. Road Bankstown, ACT',   'Ap #261-6394 Duis Rd. Surry Hills, ACT',   '802-7315 Nisi Street Surry Hills, SA',   '4401 Nam St. Chatswood, ACT',   '439-9044 Quisque St. Mortdale, QSLD',   'Ap #240-2866 Adipiscing, St. Surry Hills, ACT',   '855-655 Et Rd. Surry Hills, SA',   '6879 Mauris Av. Newtown, ACT',   '786-1051 Ut, Av. Chatswood, QSLD',   'Ap #277-2411 Convallis, Avenue Newtown, ACT',   '8299 Nonummy St. Bankstown, ACT',   'Ap #384-3295 Sagittis Avenue Bankstown, SA',   'Ap #484-3574 Nec Avenue Bankstown, NT',   '885-2723 Porttitor St. Surry Hills, SA',   '885 Sodales Street Newtown, QSLD',   '720-5191 Eu, Av. Surry Hills, NT',   'Ap #161-319 Mauris Street Mortdale, SA',   '863-9435 Cras St. Surry Hills, NSW',   'Ap #900-3569 Scelerisque Road Chatswood, QSLD',   '578-9554 Sapien St. Mortdale, NSW',   '644-5189 Elit, Avenue Newtown, TAS',   '565-3899 Sagittis Rd. Bankstown, ACT',   '371-8478 Amet, St. Surry Hills, QSLD',   'Ap #884-4044 Nibh Rd. Chatswood, ACT',   '391-2017 Risus. Av. Chatswood, NSW',   'Ap #144-8734 Non, Rd. Bankstown, QSLD',   '9970 Ante Ave Bankstown, NT',   'Ap #128-9549 Enim Road Surry Hills, SA',   'Ap #348-3619 Est, Ave Surry Hills, SA',   '4122 Ut St. Manly, SA',   'Ap #914-9351 Non Road Manly, ACT',   '579-2764 Ultrices. Ave Chatswood, SA',   'Ap #532-5640 Ullamcorper. Road Bankstown, QSLD',   '4312 Id, St. Newtown, ACT',   '427-6136 Non, Av. Surry Hills, QSLD',   'Ap #535-9872 Integer St. Surry Hills, NT',   'Ap #791-4169 Mauris. Rd. Newtown, SA',   'Ap #319-9471 Ac Road Newtown, QSLD',   '170-348 Arcu Road Manly, ACT',   'Ap #294-7618 Tortor. Street Mortdale, TAS',   '961-4240 At, Street Newtown, SA',   '683-4274 Elit Road Chatswood, SA',   'Ap #707-8712 Sit Avenue Chatswood, NSW',   '9216 Eu Rd. Chatswood, TAS',   'Ap #232-9427 Fusce Ave Surry Hills, ACT',   '8789 Elit, Road Newtown, NSW',   '407-4590 Lectus. Ave Bankstown, ACT',   'Ap #472-2222 Enim Street Newtown, NT',   '321-7821 Quam Road Bankstown, ACT',   '625-5804 Ligula. Av. Surry Hills, ACT',   '738-7009 Aliquet Rd. Surry Hills, QSLD' ].map(x => {
  return {address: x}
})

const searcher = new Fuse(autofills, {
  shouldSort: true,
  minMatchCharLength: 1,
  maxPatternLength: 32,
  distance: 100,
  threshhold: 0.6,
  keys: ['address']
})

export default searcher
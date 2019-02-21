import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Alert, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { STATUS } from './UserTable'

function OnlyStatusFactory(user) {
  return ({ status, children }) => user.status === status && children
}

function UserEditDropdown({ me, user, ...props }) {
  const { admin, username } = user
  const [open, setOpen] = useState(false)
  const {
    handleClickEdit,
    handleClickResetPassword,
    handleClickApprove,
    handleClickSuspend,
    handleClickRestore,
    handleClickRemove,
    handleClickRemoveCompletely,
    handleClickRevokeAdmin,
    handleClickGrantAdmin,
  } = props
  const OnlyStatus = OnlyStatusFactory(user)

  return (
    <Dropdown isOpen={open} toggle={() => setOpen(!open)}>
      <DropdownToggle color="light" caret>
        編集
      </DropdownToggle>
      <DropdownMenu right>
        <div className="dropdown-menu-buttons">
          <DropdownItem header>編集メニュー</DropdownItem>
          <Button color="light" onClick={() => handleClickEdit(user)}>
            編集
          </Button>
          <Button color="light" onClick={() => handleClickResetPassword(user)}>
            パスワードの再発行
          </Button>
          <DropdownItem header>ステータス</DropdownItem>
          <OnlyStatus status={STATUS.REGISTERED}>
            <Button color="info" onClick={() => handleClickApprove(user)}>
              承認する
            </Button>
          </OnlyStatus>
          <OnlyStatus status={STATUS.ACTIVE}>
            <Button color="warning" onClick={() => handleClickSuspend(user)}>
              アカウント停止
            </Button>
          </OnlyStatus>
          <OnlyStatus status={STATUS.SUSPENDED}>
            <Button color="light" onClick={() => handleClickRestore(user)}>
              元に戻す
            </Button>
          </OnlyStatus>
          {/* label は同じだけど、こっちは論理削除 */}
          <Button color="danger" onClick={() => handleClickRemove(user)}>
            削除する
          </Button>
          {/* label は同じだけど、こっちは物理削除 */}
          <OnlyStatus status={STATUS.INVITED}>
            <Button color="danger" onClick={() => handleClickRemoveCompletely(user)}>
              削除する
            </Button>
          </OnlyStatus>
          <OnlyStatus status={STATUS.ACTIVE}>
            {/* activated な人だけこのメニューを表示 */}
            <DropdownItem header>管理者メニュー</DropdownItem>

            {admin ? (
              username !== me.username ? (
                <Button color="danger" onClick={() => handleClickRevokeAdmin(user)}>
                  管理者からはずす
                </Button>
              ) : (
                <DropdownItem>
                  <Alert color="danger">自分自身を管理者から外すことはできません</Alert>
                </DropdownItem>
              )
            ) : (
              <Button color="primary" onClick={() => handleClickGrantAdmin(user)}>
                管理者にする
              </Button>
            )}
          </OnlyStatus>
        </div>
      </DropdownMenu>
    </Dropdown>
  )
}

UserEditDropdown.propTypes = {
  me: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleClickEdit: PropTypes.func.isRequired,
  handleClickResetPassword: PropTypes.func.isRequired,
  handleClickApprove: PropTypes.func.isRequired,
  handleClickSuspend: PropTypes.func.isRequired,
  handleClickRestore: PropTypes.func.isRequired,
  handleClickRemove: PropTypes.func.isRequired,
  handleClickRemoveCompletely: PropTypes.func.isRequired,
  handleClickRevokeAdmin: PropTypes.func.isRequired,
  handleClickGrantAdmin: PropTypes.func.isRequired,
}

export default UserEditDropdown

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'

// ** Icons Imports
import Circle from 'mdi-material-ui/Circle'
import SendOutline from 'mdi-material-ui/SendOutline'
import StarOutline from 'mdi-material-ui/StarOutline'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'
import AlertOctagonOutline from 'mdi-material-ui/AlertOctagonOutline'

// ** Third Party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// ** Custom Components Imports
import CustomBadge from 'src/@core/components/mui/badge'

// ** Styled Components
const ListItemStyled = styled(ListItem)(({ theme }) => ({
  borderLeftWidth: '3px',
  borderLeftStyle: 'solid',
  padding: theme.spacing(0, 5),
  marginBottom: theme.spacing(2)
}))

const ListBadge = styled(CustomBadge)(() => ({
  '& .MuiBadge-badge': {
    height: '18px',
    minWidth: '18px',
    transform: 'none',
    position: 'relative',
    transformOrigin: 'none'
  }
}))

const SidebarLeft = props => {
  // ** Props
  const {
    store,
    hidden,
    lgAbove,
    dispatch,
    leftSidebarOpen,
    leftSidebarWidth,
    toggleComposeOpen,
    setMailDetailsOpen,
    handleSelectAllMail,
    handleLeftSidebarToggle
  } = props

  const RenderBadge = (folder, color) => {
    if (store && store.mailMeta && store.mailMeta[folder] > 0) {
      return <ListBadge skin='light' color={color} sx={{ ml: 2 }} badgeContent={store.mailMeta[folder]} />
    } else {
      return null
    }
  }

  const handleActiveItem = (type, value) => {
    if (store && store.filter[type] !== value) {
      return false
    } else {
      return true
    }
  }

  const handleListItemClick = () => {
    setMailDetailsOpen(false)
    setTimeout(() => dispatch(handleSelectAllMail(false)), 50)
    handleLeftSidebarToggle()
  }

  const activeInboxCondition =
    store && handleActiveItem('folder', 'inbox') && store.filter.folder === 'inbox' && store.filter.label === ''

  const ScrollWrapper = ({ children }) => {
    if (hidden) {
      return <Box sx={{ height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
    } else {
      return <PerfectScrollbar options={{ wheelPropagation: false }}>{children}</PerfectScrollbar>
    }
  }

  return (
    <Drawer
      open={leftSidebarOpen}
      onClose={handleLeftSidebarToggle}
      variant={lgAbove ? 'permanent' : 'temporary'}
      ModalProps={{
        disablePortal: true,
        keepMounted: true // Better open performance on mobile.
      }}
      sx={{
        zIndex: 9,
        display: 'block',
        position: lgAbove ? 'static' : 'absolute',
        '& .MuiDrawer-paper': {
          boxShadow: 'none',
          width: leftSidebarWidth,
          zIndex: lgAbove ? 2 : 'drawer',
          position: lgAbove ? 'static' : 'absolute'
        },
        '& .MuiBackdrop-root': {
          position: 'absolute'
        }
      }}
    >
      <Box sx={{ p: 5, overflowY: 'hidden' }}>
        <Button fullWidth variant='contained' onClick={toggleComposeOpen}>
          Napisz Wiadomość
        </Button>
      </Box>
      <ScrollWrapper>
        <Box sx={{ pt: 1.25, overflowY: 'hidden' }}>
          <List component='div'>
            <Link href='/apps/email/inbox' passHref>
              <ListItemStyled
                component='a'
                onClick={handleListItemClick}
                sx={{
                  pt: 0.5,
                  borderLeftColor: theme => (activeInboxCondition ? theme.palette.primary.main : 'transparent')
                }}
              >
                <ListItemIcon sx={{ color: activeInboxCondition ? 'primary.main' : 'text.secondary' }}>
                  <EmailOutline sx={{ fontSize: '1.25rem' }} />
                </ListItemIcon>
                <ListItemText
                  primary='Odebrane'
                  primaryTypographyProps={{
                    noWrap: true,
                    sx: {
                      color: theme => (activeInboxCondition ? theme.palette.primary.main : '')
                    }
                  }}
                />
                {RenderBadge('inbox', 'primary')}
              </ListItemStyled>
            </Link>
            <Link href='/apps/email/sent' passHref>
              <ListItemStyled
                component='a'
                onClick={handleListItemClick}
                sx={{
                  borderLeftColor: theme =>
                    handleActiveItem('folder', 'sent') ? theme.palette.primary.main : 'transparent'
                }}
              >
                <ListItemIcon sx={{ color: handleActiveItem('folder', 'sent') ? 'primary.main' : 'text.secondary' }}>
                  <SendOutline sx={{ fontSize: '1.25rem' }} />
                </ListItemIcon>
                <ListItemText
                  primary='Wysłane'
                  primaryTypographyProps={{
                    noWrap: true,
                    sx: {
                      color: theme => (handleActiveItem('folder', 'sent') ? theme.palette.primary.main : '')
                    }
                  }}
                />
              </ListItemStyled>
            </Link>
            <Link href='/apps/email/draft' passHref>
              <ListItemStyled
                component='a'
                onClick={handleListItemClick}
                sx={{
                  borderLeftColor: theme =>
                    handleActiveItem('folder', 'draft') ? theme.palette.primary.main : 'transparent'
                }}
              >
                <ListItemIcon sx={{ color: handleActiveItem('folder', 'draft') ? 'primary.main' : 'text.secondary' }}>
                  <PencilOutline sx={{ fontSize: '1.25rem' }} />
                </ListItemIcon>
                <ListItemText
                  primary='Szkice'
                  primaryTypographyProps={{
                    noWrap: true,
                    sx: {
                      color: theme => (handleActiveItem('folder', 'draft') ? theme.palette.primary.main : '')
                    }
                  }}
                />
                {RenderBadge('draft', 'warning')}
              </ListItemStyled>
            </Link>
            <Link href='/apps/email/starred' passHref>
              <ListItemStyled
                component='a'
                onClick={handleListItemClick}
                sx={{
                  borderLeftColor: theme =>
                    handleActiveItem('folder', 'starred') ? theme.palette.primary.main : 'transparent'
                }}
              >
                <ListItemIcon sx={{ color: handleActiveItem('folder', 'starred') ? 'primary.main' : 'text.secondary' }}>
                  <StarOutline sx={{ fontSize: '1.25rem' }} />
                </ListItemIcon>
                <ListItemText
                  primary='Oznaczone'
                  primaryTypographyProps={{
                    noWrap: true,
                    sx: {
                      color: theme => (handleActiveItem('folder', 'starred') ? theme.palette.primary.main : '')
                    }
                  }}
                />
              </ListItemStyled>
            </Link>
            <Link href='/apps/email/trash' passHref>
              <ListItemStyled
                component='a'
                onClick={handleListItemClick}
                sx={{
                  borderLeftColor: theme =>
                    handleActiveItem('folder', 'trash') ? theme.palette.primary.main : 'transparent'
                }}
              >
                <ListItemIcon sx={{ color: handleActiveItem('folder', 'trash') ? 'primary.main' : 'text.secondary' }}>
                  <DeleteOutline sx={{ fontSize: '1.25rem' }} />
                </ListItemIcon>
                <ListItemText
                  primary='Usunięte'
                  primaryTypographyProps={{
                    noWrap: true,
                    sx: {
                      color: theme => (handleActiveItem('folder', 'trash') ? theme.palette.primary.main : '')
                    }
                  }}
                />
              </ListItemStyled>
            </Link>
          </List>
        </Box>
      </ScrollWrapper>
    </Drawer>
  )
}

export default SidebarLeft

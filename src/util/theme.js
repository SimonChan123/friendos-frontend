export default {
    palette: {
      primary: {
        light: '#3378af',
        main: '#01579b',
        dark: '#003c6c',
        contrastText: '#fff'
      },
      secondary: {
        light: '#ff6333',
        main: '#ff3d00',
        dark: '#b22a00',
        contrastText: '#fff'
      }
    },
    typography: {
      useNextVariants: true
    },
    spreadThis: {
      form: {
        textAlign: 'center'
      },
      image: {
          width: '64px',
          height: '64px',
          margin: '10px auto 10px auto'
      },
      pageTitle: {
          margin: '5px auto 5px auto'
      },
      textField: {
          margin: '5px auto 15px auto'
      },
      button: {
          margin: '10px auto 15px auto',
          position: 'relative'
      },
      progress: {
          position: 'absolute'
      },
      invisibleSeparator: {
        border: 'none',
        margin: 4
      },
      visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        marginBottom: 20
      },
      customError: {
          color: 'red',
          fontSize: '0.8rem'
      },
      paper: {
        padding: 20
      },
      profile: {
          '& .image-wrapper': {
              textAlign: 'center',
              position: 'relative',
              '& button': {
                  position: 'absolute',
                  top: '80%',
                  left: '70%'
              }
          },
          '& .profile-image': {
              width: 200,
              height: 200,
              objectFit: 'cover',
              maxWidth: '100%',
              borderRadius: '50%'
          },
          '& .profile-details': {
              textAlign: 'center',
              '& span, svg': {
                  verticalAlign: 'middle'
              },
          '& a': {
              color: '#01579b'
          }
          },
          '& hr': {
              border: 'none',
              margin: '0 0 10px 0'
          },
          '& svg.button': {
              '&:hover': {
                  cursor: 'pointer'
              }
          }
      },
      buttons: {
          textAlign: 'center',
          '& a': {
              margin: '20px 10px'
          }
      }
    }
  }
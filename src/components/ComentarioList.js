import { Button, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import { Delete, Edit, Face, Sort, ThumbDown, ThumbUp, WatchLater, Grade } from '@material-ui/icons';
import { useState } from 'react';
import { Reaction, Sorting } from '../config/constants';

const ComentarioList = ( { comentarios, onDelete, onLike, onEdit } ) => {
  const [ sortBy, setSortBy ] = useState(Sorting.BY_DATE_DESC)

  const classes = useStyles()

  const sort = () => {
    const newOrder = sortBy === Sorting.BY_DATE_DESC ? Sorting.BY_DATE_ASC : Sorting.BY_DATE_DESC;
    setSortBy(newOrder);
  };

  const sortedComentarios = comentarios.slice().sort((a, b) => {
    return sortBy === Sorting.BY_DATE_DESC ? b.timestamp - a.timestamp : a.timestamp - b.timestamp;
  });

  return comentarios.length ? (
    <Grid container spacing={1}>
      <Grid container item spacing={1} alignItems="center">
        <Grid item className={classes.numComentarios}>
          <Typography color="primary" variant="button">{comentarios.length} comentário(s)</Typography>
        </Grid>
        <Grid item>
          <Button size="small" color="primary" variant="outlined" onClick={sort} startIcon={<Sort fontSize="small"/>}>
            { sortBy === Sorting.BY_DATE_ASC ? <span>Mais Novos</span> : <span>Mais Antigos</span> }
          </Button>
        </Grid>
      </Grid>
      {sortedComentarios.map( comentario => (
        <Grid key={comentario.id} container item spacing={1} className={classes.comentario}>

          <Grid container spacing={1} className={classes.dataPostagem} alignItems="center">
            <Grid item><WatchLater fontSize="inherit"/></Grid>
            <Grid item>{new Date(comentario.timestamp).toLocaleString('pt-BR')}</Grid>
          </Grid>

          <Grid container className={classes.corpo} alignItems="center">
            <Grid item>{comentario.corpo}</Grid>
          </Grid>

          <Grid container spacing={1} className={classes.details} alignItems="center">
            <Grid item><Face fontSize="inherit"/></Grid>
            <Grid item>{comentario.autor}</Grid>
            <Grid item><Grade fontSize="inherit"/></Grid>
            <Grid item>{comentario.nota}</Grid>
          </Grid>
          
          <Grid container>
            <IconButton size="small" component="span" onClick={() => onLike(comentario.id, Reaction.LIKE)}><ThumbUp fontSize="inherit"/></IconButton>
            <IconButton size="small" component="span" onClick={() => onLike(comentario.id, Reaction.DISLIKE)}><ThumbDown fontSize="inherit"/></IconButton>
            <IconButton size="small" component="span" onClick={() => onEdit(comentario.id)}><Edit fontSize="inherit"/></IconButton>
            <IconButton size="small" component="span" onClick={() => onDelete(comentario.id)}><Delete fontSize="inherit"/></IconButton>
          </Grid>
        </Grid>
      ))}
    </Grid>
  ) : (
    <Grid container spacing={1} alignContent="center" className={classes.semComentario}>
      <Grid item><Typography variant="overline">Nenhum comentário ainda.</Typography></Grid>
    </Grid>
  )
}

const useStyles = makeStyles( theme => ({
  corpo: {
    fontSize: '11px',
    fontWeight: 'lighter',
    paddingTop: '10px',
    paddingBottom: '10px',
    margin: '2px 0 2px 4px',
  },
  details: {
    fontSize: '10px',
    margin: 'auto',
    fontWeight: '500',
  },
  dataPostagem: {
    padding: '6px auto 6px auto',
    margin: '2px 0',
    fontSize: '10px',
    border: 'none',
    color: 'gray',
  },
  comentario: {
    backgroundColor: '#DBE3F2',
    borderRadius: '5px',
    border: 'none',
    margin: '5px 10px 10px 10px',
    padding: '15px',
  },
  semComentario: {
    padding: '8px',
  },
  numComentarios: {
    margin: '0 0 0 8px',
  },
}))

export default ComentarioList;
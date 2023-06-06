import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { deleteCardsFetch, getMyCardsFetch } from '../api/game';
import { createCardFetch } from '../api/game';
import { useMemo, useState } from 'react';
import { Pagination, Stack } from '@mui/material';
import CardGamesPlate from '../components/CardGamesPlate/CardGamesPlate';
import { RootState } from '../state/reducers';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useLocation, useNavigate, useNavigation, useParams } from 'react-router-dom';


export default function MyCardsPage() {
    const auth = useSelector((state: RootState) => state).auth
    const cardsOnPage = 7
    const [ids, setIds] = useState<string[]>([])
    const [pageIds, setPageIds] = useState<string[]>([])
    const {page} = useParams<string>();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState<number>(parseInt(page!,10))
    useMemo(() =>  {getMyCardsFetch(auth['id']).then((Response: XMLHttpRequest["response"]) => {
            setIds(Response.data)
            setPageIds(Response.data.slice((currentPage-1)*cardsOnPage, currentPage*cardsOnPage))
    })}, [currentPage, auth]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        event.preventDefault()
        setCurrentPage(value);
        navigate('../mycards/' + value, { replace: false } )
      };
    

         useEffect(() => {
            if (page) {
            setPageIds(ids.slice((parseInt(page,10)-1)*cardsOnPage, parseInt(page,10)*cardsOnPage))
            setCurrentPage(parseInt(page,10));
            }
          }, [page]);

       
     

        const deleteCard = async (id: string) => {
            deleteCardsFetch(id, auth['id']).then(Response => { 
                var array = [...ids]
                if (array.includes(id)) {
                    var indexToRemove = array.indexOf(id);
                    array.splice(indexToRemove, 1);
                setIds([...array])
                setPageIds(array.slice((currentPage-1)*cardsOnPage, currentPage*cardsOnPage))
        }})} 

    const cards = pageIds.map((id: string, index: number) =>
        <CardGamesPlate deleteCard={deleteCard} id={id} key={index} index={index}></CardGamesPlate>
    );

    return (
        <>
                    <> 
                    {pageIds.length < 1 ?
                        <Typography 
                        variant="h5" 
                        style={{ wordWrap: "break-word"}} 
                        sx={{display: '-webkit-box', 
                        overflow: 'hidden', 
                        WebkitBoxOrient: 'vertical',
                        color: '#fff'
                        }} 
                        component="div">
                            There's no cards in here, or URL is wrong!
                        </Typography > 
                        :
                        <>
                        <Stack direction="column" spacing={2} sx={{marginBottom: 5, display: 'flex', alignItems: 'center'}}>
                        <Pagination page={currentPage} onChange={handlePageChange} color="primary" count={Math.ceil(ids.length/cardsOnPage)} variant="outlined" shape="rounded" />
                        {cards}
                        <Pagination page={currentPage} onChange={handlePageChange} color="primary" count={Math.ceil(ids.length/cardsOnPage)} variant="outlined" shape="rounded" />
                        </Stack>
                        </>
                    }
                    </>
        </>
    )
}
import React, { Component } from "react";
import { createContext } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

//export const UserContext = createContext({});

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

class Camion extends Component {

    constructor() {
        super();
        this.state = {
            camions: null
        };
    }

    fetchCamions() {
        fetch('http://localhost:9090/api/camion/all', {
            method: 'GET',
            headers: { 'Authorization': 'Basic ' + btoa('blessiesuresh@recycle.com:password') }
        }).then(results => {
            if (!results.ok) {
                throw Error(results.statusText);
            }
            console.log(results.statusText)
            return results.json();
        }).then(data => {
            this.setState({ camions: data._embedded.camions });
        }).catch(error => {
            console.log(error);
        });

        // fetch('http://localhost:9090/api/camion/all)
        //     .then(results => {
        //         if (!results.ok) {
        //             throw Error(results.statusText);
        //         }
        //         console.log(results.statusText)
        //         return results.json();
        //     }).then(data => {
        //         this.setState({ camions: data._embedded.camions });
        //     }).catch(error => {
        //         console.log(error);
        //     });
    }

    componentDidMount() {
        this.fetchCamions();
    }

    render() {
        if (this.state.camions) {

            const camionsArray = this.state.camions.map(camion => {
                return <StyledTableRow key={camion.noimmatric}>
                    <StyledTableCell component="th" scope="row">
                        {camion.noimmatric}
                    </StyledTableCell>
                    <StyledTableCell>{camion.marque}</StyledTableCell>
                    <StyledTableCell>{camion.dateachat}</StyledTableCell>
                    <StyledTableCell>{camion.modele}</StyledTableCell>
                    <StyledTableCell>
                        <Button color="primary" href="/tours">
                            Tours
                        </Button>
                    </StyledTableCell>
                </StyledTableRow>;
            });
            return (
                <div>
                    <h3>Camions</h3>
                    <TableContainer component={Paper}>
                        <Table name="camions" className={useStyles.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Noimmatric</StyledTableCell>
                                    <StyledTableCell>Marque</StyledTableCell>
                                    <StyledTableCell>Dateachat</StyledTableCell>
                                    <StyledTableCell>Modele</StyledTableCell>
                                    <StyledTableCell>Tours</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {camionsArray}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            );
        } else {
            return (<div></div>);
        }
    }
}

export default Camion;

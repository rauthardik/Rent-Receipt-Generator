import './Receipts.css';
import './sheets-of-paper-a4.css'
import {useState} from "react"
import { Col, Container, Row , Form, Button} from 'react-bootstrap';
import $ from 'jquery';
import Cookies from 'universal-cookie';


function Receipts(props) {
    const saveDataToCookies = (cookieName, url, response) => {
        
        const cookies = new Cookies();
        cookies.set(cookieName, JSON.stringify(response), { path: '/' });
    };

    const [records, setNewRecord] = useState(undefined===props.cached_records?[]:props.cached_records);
    
    const addNewRecord=(event)=>{
        
        setNewRecord(prevRecords=>[...prevRecords, {
            currancy:'₹',
            tenantName:event.target.tenant_name.value,
            ownerName:event.target.owner_name.value?event.target.owner_name.value:'',
            ownerPAN:event.target.owner_pan.value?event.target.owner_pan.value:'',
            propertyAddress:event.target.property_address.value?event.target.property_address.value:'',
            receiptMonth:event.target.receipt_month.value?event.target.receipt_month.value:'',
            dateOfPayment:event.target.payment_date.value?event.target.payment_date.value:'',
            paymentAmount:event.target.rent_amount.value?event.target.rent_amount.value:'',
            modeOfPayment:event.target.payment_mode.value?event.target.payment_mode.value:'Cash Payment',
            idOfPayment:event.target.transaction_id.value?event.target.transaction_id.value:'',
            }]);

            event.preventDefault();
    }

    const removeThisRecord = (index) => {
            let data = [...records];
            data.splice(index, 1);
            setNewRecord(data);
            saveDataToCookies('rent_receipts_app_cache', window.location.href, records);
    }

    const printReceipts = () => {
        //Remove additional items such as input boxes, labels.
        $('.receipts-form').hide();
        $('.receipt-remove-button').hide();
        window.print();
        $('.receipts-form').show();
        $('.receipt-remove-button').show();
    }




    const printReceiptContent = () => {
        let form  = <Container className='receipts-form'>
        {/* Common Fields */}
        <hr/>
        <Row className='form-header'>
            <h3>Use the form below to generate the rent receipts</h3>
        </Row>
        <Form onSubmit={addNewRecord}>
            <Row>
                <Col md="8" lg="8" sm="8">
                    <Form.Group className="mb-3" controlId="owner_name">
                        <Form.Control type="text" name="owner_name" placeholder="Enter Owner Name" required/>
                    </Form.Group>
                </Col>
                <Col md="4" lg="4" sm="4">
                    <Form.Group className="mb-3" controlId="owner_pan">
                        <Form.Control type="text" name="owner_pan" placeholder="PAN Number" />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Form.Group className="mb-3" controlId="property_address">
                        <Form.Control as="textarea" rows={3} name="property_address" placeholder="Detailed Property Address" required/>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group className="mb-3" controlId="tenant_name">
                        <Form.Control type="text" name="tenant_name" placeholder="Tenants Name" required/>
                </Form.Group>
            </Row>
            <Row>
                 <Col>
                    <Form.Group className="mb-3" controlId="receipt_month">
                            <Form.Control type="text" name="receipt_month" placeholder="Duration (eg. MAY 21/MAY 21 - JUL 21)" required/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="rent_amount">
                            <Form.Control type="number" name="rent_amount" placeholder="Rent Amount" required/>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="payment_date">
                                <Form.Control type="date" name="payment_date" placeholder="Receipt Month" />
                        </Form.Group>
                    </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="payment_mode">
                        <Form.Select id="payment_mode" name="payment_mode" required>
                            <option>Cash Payment</option>
                            <option>Online Transfer (UPI)</option>
                            <option>Online Transfer (Other)</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3" controlId="transaction_id">
                            <Form.Control type="text" name="transaction_id" placeholder="TXN. ID (Optional)" />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md="6" lg="6" sm="6"><Button variant="primary" type="submit"> {0===records.length?'Create A Receipt':'Add New Receipt'} </Button></Col>
                <Col md="6" lg="6" sm="6" className='records-count' ><Button variant='info' disabled>Receipt Count : {records.length}</Button></Col>
            </Row>
        </Form>
            <Row className='print-button-row'>
                <Col>
                    <Button variant="outline-primary" onClick={printReceipts} type="clear">Print All The Generated Receipts</Button>
                </Col>
            </Row>
        </Container>;
        
        saveDataToCookies('rent_receipts_app_cache', window.location.href, records);

        return (<div className='page' id="printArea">
        {records.map((record, index) => {
            return(
                <div key={index} className="rent-receipt-container-parent">
                    <Button variant='outline-danger' onClick={()=>removeThisRecord(index)} className='receipt-remove-button'>Remove</Button>
                    <div className='rent-receipt-container'>
                    <div className='rent-receipt-header'>
                        <div className='header-title'>
                            <h2>RENT RECEIPT <span className='header-month'> {record.receiptMonth}</span> </h2> 
                        </div>
                        <div className='header-date'>
                            <span>Date : </span>
                            <span className='date'>{record.dateOfPayment}</span> 
                        </div>
                    </div>
                    <div className='rent-receipt-body'>
                        <p>
                            Received a sum Of <b>{record.currancy}{record.paymentAmount}</b> from <b>{record.tenantName}</b> towards the rent of property located at <b>{record.propertyAddress}</b>,
                            for the month/months of <b>{record.receiptMonth}</b>.
                        </p>
                    </div>
                    <div className='rent-receipt-footer'>
                        <div className='rent-receipt-footer-left'>
                            <div className='rent-receipt-payment-details'>
                                <span className='payment-mode'>Paid Through {record.modeOfPayment}</span>
                                <br/>
                                <span className='payment-id'>{record.idOfPayment?'#'+record.idOfPayment:''}</span>
                            </div>
                        </div>
                        <div className='rent-receipt-footer-right'>
                            <br/>
                            <div className='rent-receipt-footer-owner'>
                                <span className='owner-name'>{record.ownerName}</span><span className='landlord-label'> (Landlord)</span>                        
                                <br/>
                                <span>{record.ownerPAN?'PAN: '+ record.ownerPAN:''}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <div className='separator'></div>
            </div>
        );
        })}

        {form}
    </div>);
    }

    return(printReceiptContent());
}

export default Receipts;
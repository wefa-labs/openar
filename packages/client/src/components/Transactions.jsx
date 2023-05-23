import React, { useContext } from 'react';

import { TransactionContext } from '../context/TransactionContext';

import dummyData from '../utils/dummyData';
import { shortenAddress } from '../utils/shortenAddress';
import useFetch from '../hooks/useFetch'

const TransactionsCard = ({ addressTo, addressFrom, timestamp, keyword, message, amount, url }) => {
  const gifUrl = useFetch({ keyword });

  return (
    <div className='flex flex-1 flex-col m-4 p-3 bg-[#181918]
      sm:min-w-[270px]
      sm:max-w-[300px]
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      min-w-full
      rounded-md hover:shadow-2xl
    '>
      <div className='w-full flex flex-col items-center mt-3'>
        <div className='w-full mb-6 p-2'>
          <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="noopener noreferrer">
            <p className="text-white text-base">From: {shortenAddress(addressFrom)}</p>
          </a>
          <a href={`https://ropsten.etherscan.io/address/${addressTo}`} target="_blank" rel="noopener noreferrer">
            <p className="text-white text-base">To: {shortenAddress(addressTo)}</p>
          </a>
          <p className='text-white text-base'>Amount: {amount} ETH</p>
          {
            message && (
              <>
                <br />
                <p className='text-white text-base'>Message: {message}</p>
              </>
          )}
        </div>
        <img
          src={gifUrl || url}
          alt="gif"
          className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
        />
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">{timestamp}</p>
        </div>
      </div>
    </div>
  )
}

const Transactions = () => {
  const { transactions, currentAccount } = useContext(TransactionContext);

  return (
    <div className='flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions'>
      
    </div>
  )
}

export default Transactions
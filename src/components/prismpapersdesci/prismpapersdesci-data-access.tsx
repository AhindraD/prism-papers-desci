'use client'

import { getPrismpapersdesciProgram, getPrismpapersdesciProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

export function usePrismpapersdesciProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getPrismpapersdesciProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getPrismpapersdesciProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['prismpapersdesci', 'all', { cluster }],
    queryFn: () => program.account.prismpapersdesci.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['prismpapersdesci', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ prismpapersdesci: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function usePrismpapersdesciProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = usePrismpapersdesciProgram()

  const accountQuery = useQuery({
    queryKey: ['prismpapersdesci', 'fetch', { cluster, account }],
    queryFn: () => program.account.prismpapersdesci.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['prismpapersdesci', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ prismpapersdesci: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['prismpapersdesci', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ prismpapersdesci: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['prismpapersdesci', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ prismpapersdesci: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['prismpapersdesci', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ prismpapersdesci: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}

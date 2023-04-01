import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Participant } from '../../components/Participant'
import { styles } from './styles'
import { useState } from 'react'

export function Home(){

  const [participants, setParticipants] = useState<string[]>([])
  const [participantName, setParticipantName] = useState<string>('')

  function handleParticipantAdd(){

    if(participantName === '') {
      return Alert.alert('Nome vazio', 'Digite o nome do participante a ser adicionado')
    }

    if(participants.includes(participantName)) {
      return Alert.alert('Participante Existe',
       `O participante ${participantName} já está incluso na lista de espera`)
    }

    setParticipants(prevState => {
      return [...prevState, participantName]
    })

    setParticipantName('')
  }

  function handleParticipantRemove(name: string) {

    Alert.alert('Remover', `Deseja remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => setParticipants(prevState => {
          const newState = prevState.filter(participant => participant !== name)
          return newState
        })
      },
      
      {
        text: 'Não',
        style: 'cancel'
      }
    ])
    
  }

  return (
    <View style={styles.container}>
      
      <Text style={styles.eventName}>Nome do evento</Text>
      <Text style={styles.eventDate}>Sexta, 4 de novembro de 2023.</Text>

      
      <View style={styles.form}>
          <TextInput 
            style={styles.input}
            placeholder="Nome do participante"
            placeholderTextColor='#6b6b6b'
            value={participantName}
            onChangeText={setParticipantName}
          />

          <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
            <Text style={styles.buttonText}>
              +
            </Text>
          </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={participants}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <Participant 
            key={item} 
            name={item} 
            onRemove={() => handleParticipantRemove(item)}
          />
      )}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>Ninguém chegou no evento ainda? Adicione participantes a sua lista de espera</Text> 
        )}
      />

    </View>
  )
}
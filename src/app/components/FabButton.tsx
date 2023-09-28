import { SpeedDial, Button, Input, color } from '@rneui/base';
import { View, Modal, Text, Alert, StyleSheet, Pressable } from 'react-native';
import React, { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import axios from 'axios';
import { router } from 'expo-router';
import { FAB } from '@rneui/themed';

export default function FabButton() {
	const [open, setOpen] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [formName, setFormName] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		setFormName(e.target.value);
		router.push('/createForm');
	};

	/* const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.post('https://localhost:8080/forms', {
				name: formName,
			})
			.then(res => {
				console.log(res);
				console.log(res.data);
				router.push('form')
			})
			.catch(error => console.log(error));
	}; */

	return (
		<>
			<Modal
				transparent={true}
				animationType='fade'
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.');
					setModalVisible(!modalVisible);
				}}>
				<View style={s.container}>
					<View style={s.modalView}>
						<View style={s.modalTop}>
							<Text style={s.title}>Criação de formulário</Text>
							<Pressable onPress={() => setModalVisible(!modalVisible)}>
								<FontAwesome
									color='darkgray'
									size={24}
									name='close'
								/>
							</Pressable>
						</View>
						<View style={s.input}>
							<Input
								placeholder='Nome do formulário'
								allowFontScaling={true}
								clearTextOnFocus={true}
								autoCapitalize='none'
								style={s.customInput}
								autoCorrect={false}
								inputContainerStyle={s.inputContainerStyle}
								containerStyle={s.containerStyle}
								value={formName}
								onChangeText={setFormName}
							/>
						</View>
						<Pressable style={s.finishButton}>
							<Button
								onPressIn={handleSubmit}
								radius='md'
								color='black'
								size='md'
								title='OK'
								titleStyle={{ color: 'white' }}></Button>
						</Pressable>
					</View>
					<View><Text>{formName}</Text></View>
				</View>
			</Modal>
			<FAB 
				placement='right'
				color='black'
				upperCase={true}
				icon={{ name: 'add', color: 'white' }}
				onPress={() => {
					setModalVisible(!modalVisible)
				}}
			/>

			{/* <SpeedDial
				color='#181515'
				isOpen={open}
				icon={{
					name: 'edit',
					color: '#fff',
				}}
				openIcon={{
					name: 'close',
					color: '#fff',
				}}
				onOpen={() => setOpen(!open)}
				onClose={() => setOpen(!open)}>
				<SpeedDial.Action
					color='#65D45D'
					icon={{
						name: 'add',
						color: '#fff',
					}}
					title='Novo'
					onPress={() => {
						setModalVisible(!modalVisible);
						setOpen(!open);
					}}
				/>
				<SpeedDial.Action
					color='#EB4B46'
					icon={{
						name: 'delete',
						color: '#fff',
					}}
					title='Excluir'
					onPress={() => console.log('deletar formulário')}
				/>
			</SpeedDial> */}
		</>
	);
}

const s = StyleSheet.create({
	finishButton: { width: '100%', height: 'auto' },
	modalTop: {
		justifyContent: 'space-between',
		height: 'auto',
		width: '100%',
		flexDirection: 'row',
	},
	closeButton: {
		height: 32,
	},
	modalView: {
		gap: 16,
		width: '90%',
		backgroundColor: '#FAFAFA',
		borderRadius: 6,
		padding: 16,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	customInput: {
		top: 12,
		fontSize: 16,
		paddingLeft: 8,
	},
	input: {
		gap: 10,
	},
	inputContainerStyle: {
		borderBottomWidth: 0,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 0,
		paddingBottom: 0,
		height: 24,
		width: '90%',
	},
	containerStyle: {
		backgroundColor: 'white',
		borderRadius: 12,
		borderColor: 'black',
		borderWidth: 1,
		shadowColor: 'black',
		elevation: 2,
	},
	text: {
		justifyContent: 'flex-start',
		width: '100%',
	},
});

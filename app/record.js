import React, {useState} from 'react';
import { View, StyleSheet, ScrollView, Text, TextInput, Pressable, Alert } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router'

export default EmployeeRecordEdit = () => {
	const params = useLocalSearchParams();

	const navigation = useNavigation();

	const [name, setName] = useState(params.name || '');
	const [position, setPosition] = useState(params.position || '');
	const [level, setLevel] = useState(params.level || '');

	async function saveRecord() {
		const record = { name, position, level };

		try {
			let response;
			response = await fetch('https://employees-server-l554.onrender.com/record', {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(record)
			});
			// console.log("Save Record")
			if(!response.ok) {
				throw new Error(`HTTP error! status ${response.status}`);
			}
			
			Alert.alert("Employee record saved!");
		} catch(error) {
			console.error('A problem occurred with your fetch operation: ', error);
		} finally {
			setName('');
			setPosition('')
			setLevel('')
			
			navigation.popToTop()
		}
	}

	async function updateRecord(id) {
		const record = { name, position, level };

		try {
			let response = await fetch(`https://employees-server-l554.onrender.com/record/${id}`, {
				method: 'PATCH',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(record)
			})
			// console.log("Update Record")

			if(!response.ok) {
				throw new Error(`HTTP error! status ${response.status}`);
			}

			Alert.alert("Record updated successfully!");
		} catch(error) {
			console.error('A problem occurred with your fetch operation: ', error);
		} finally {
			setName('');
			setPosition('')
			setLevel('')

			navigation.popToTop()
		}
	}

	async function deleteRecord(id) {
		try {
			const response = await fetch(`https://employees-server-l554.onrender.com/record/${id}`, {
				method: 'DELETE',
				headers: {
					"Content-Type": "application/json"
				}
			})

			if(!response.ok) {
				throw new Error(`HTTP error! status ${response.status}`);
			}

			Alert.alert("Record deleted successfully");
		} catch(error) {
			console.error('A problem occurred with the fetch operation', error);
		} finally {
			setName('');
			setPosition('');
			setLevel('')

			navigation.popToTop();
		}
	}

	return (
		<ScrollView>
			<View style={styles.container}>
				<Text style={{fontWeight: 'bold', marginTop: 10}}>Name</Text>
				<TextInput
					placeholder="First Last"
					style={styles.formInput}
					defaultValue={name}
					onChangeText={newText => setName(newText)}
				/>

				<Text style={{fontWeight: 'bold', marginTop: 10}}>Position</Text>
				<TextInput
					placeholder="Advocate Developer"
					style={styles.formInput}
					defaultValue={position}
					onChangeText={newText => setPosition(newText)}
				/>

				<Text style={{fontWeight: 'bold', marginTop: 10}}>Level</Text>
				<TextInput
					placeholder="Senior Junior Intern"
					style={styles.formInput}
					defaultValue={level}
					onChangeText={newText => setLevel(newText)}
				/>

				<View style={{flexDirection: 'row'}}>
					<Pressable style={styles.actionButton} onPress={() => params._id ? updateRecord(params._id) : saveRecord()}>
						<Text style={styles.actionText}>{params._id ? "Update" : "Create"}</Text>
					</Pressable>
					{params._id	&& <Pressable style={[styles.actionButton, {backgroundColor: 'red'}]} onPress={() => deleteRecord(params._id)}>
						<Text style={[styles.actionText, {color: 'white'}]}>Delete</Text>
					</Pressable>}
				</View>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	formInput: {
		height: 30,
		width: "50%",
		borderWidth: 1
	},
	actionButton: {
		width: 80,
		height: 30,
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	actionText: {
		fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
	}
})
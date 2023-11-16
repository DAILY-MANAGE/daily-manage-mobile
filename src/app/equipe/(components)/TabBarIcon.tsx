import FontAwesome from '@expo/vector-icons/FontAwesome';
export default function TabBarIcon(props: {
 name: React.ComponentProps<typeof FontAwesome>["name"];
 color: string;
}) {
 return <FontAwesome size={26} style={{ marginBottom: -3 }} {...props} />;
}
